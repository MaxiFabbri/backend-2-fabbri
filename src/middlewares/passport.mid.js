import passport from "passport"
import envUtil from "../utils/env.util.js";
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GoogleStrategy } from "passport-google-oauth2"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { create, readByEmail, readById, update } from "../data/mongo/managers/users.manager.js"
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js"
import { createTokenUtil, verifyTokenUtil } from "../utils/token.util.js"
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = envUtil
const googleCbUrl = BASE_URL + "sessions/google/cb"

passport.use("register",
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                const one = await readByEmail(email);
                if (one) {
                    const info = { message: "USER ALREADY EXISTS", statusCode: 401 };
                    return done(null, false, info);
                }
                const hashedPassword = createHashUtil(password);
                const user = await create({
                    email,
                    password: hashedPassword,
                    name: req.body.name || "Name",
                });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.use("login",
    new LocalStrategy({ usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await readByEmail(email);
                if (!user) {
                    const info = { message: "USER NOT FOUND", statusCode: 401 };
                    return done(null, false, info);
                }
                const passwordForm = password;
                const passwordDb = user.password;
                const verify = verifyHashUtil(passwordForm, passwordDb);
                if (!verify) {
                    const info = { message: "INVALID CREDENTIALS", statusCode: 401 };
                    return done(null, false, info);
                }
                const data = {
                    user_id: user._id,
                    role: user.role,
                };
                const token = createTokenUtil(data);
                user.token = token;
                await update(user._id, { isOnline: true });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.use("admin",
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
        secretOrKey: envUtil.SECRET_KEY
    },
        async (data, done) => {
            try {
                //console.log(data);
                const { user_id, role } = data;
                if (role !== "ADMIN") {
                    // const error = new Error("NOT AUTHORIZED")
                    // error.statusCode = 403
                    // return done(error)
                    const info = { message: "NOT AUTHORIZE", statusCode: 403 };
                    return done(null, false, info);
                }
                const user = await readById(user_id);
                return done(null, user);
            } catch (error) { }
        }
    )
);
passport.use("online",
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
        secretOrKey: envUtil.SECRET_KEY
    },
        async (data, done) => {
            try {
                const { user_id } = data;
                const user = await readById(user_id);
                const { isOnline } = user;
                if (!isOnline) {
                    const info = { message: "USER IS NOT ONLINE", statusCode: 401 };
                    return done(null, false, info);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.use("signout",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
        secretOrKey: envUtil.SECRET_KEY,
      },
      async (data, done) => {
        try {
          const { user_id } = data;
          await update(user_id, { isOnline: false });
          return done(null, { user_id: null });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

passport.use("google", new GoogleStrategy(    
    { 
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        passReqToCallback: true, 
        callbackURL: BASE_URL+"sessions/google/cb" 
    },
    async (req, accessToken, refreshToken, profile, done) => {      
        try {
            // desestructuro de los datos de google el id del usuario y su foto/avatar
            const { id, picture } = profile
            // como estrategia de terceros NO SE SUELE registrar al usuario por su email sino por su identificador en la base del tercero
            // esto es debido a que si utilizo el email, SI O SI necesito la contraseña y la contraseña NO LA ENVIA NINGUN TERCERO (google)
            let user = await readByEmail(id)
            // si el usuario no es parte de la base de datos
            if (!user) {
                // lo crea/registra
                user = await create({ email: id, photo: picture, password: createHashUtil(id) })
            }
            // los datos de la session se deben guardar en un token
            const data = {
                user_id: user._id,
                role: user.role,
            }
            const token = createTokenUtil(data);
            await update(user._id, { isOnline: true });
            user.token = token;
            //req.headers.token = token
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))
export default passport