class Manager {

    constructor(model) {
        this.model = model
    }

    create = async (data) => {
        try {
            const one = await this.model.create(data)
            return one
        } catch (error) {
            throw error
        }
    }

    readByEmail = async (email) => {
        try {
            const one = await this.model.findOne({ email }).lean()
            return one
        } catch (error) {
            throw error
        }
    }

    readById = async (id) => {
        try {
            const one = await this.model.findOne({ _id: id }).lean()
            return one
        } catch (error) {
            throw error
        }
    }

    read = async () => {
        try {
            const all = await this.model.find().lean()
            return all
        } catch (error) {
            throw error
        }
    }

    update = async (id, data) => {
        try {
            const opt = { new: true }
            const one = await this.model.findByIdAndUpdate(id, data, opt)
            return one
        } catch (error) {
            throw error
        }
    }

    destroy = async (id) => {
        try {
            const one = await this.model.findByIdAndDelete(id)
            return one
        } catch (error) {
            throw error
        }
    }

    // Metodo para ver productos con paginados, filtrados y ordenados
    readPaginated = async (limitNumber, pg, filter, sort) => {
        try {
            const all = await this.model.paginate(filter, {
                limit: limitNumber,
                page: pg,
                sort: sort,
                lean: true
            });
            return all
        } catch (error) {
            throw error
        }
    }

    // Metodo para recuperar los datos del Cart dependiendo del User_id
    readByUserId = async (id) => {
        try {
            const { user_id } = id
            const one = await this.model.findOne({ user_id }).lean()
            return one
        } catch (error) {
            throw error
        }
    }

}

export default Manager