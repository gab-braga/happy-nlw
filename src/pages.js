const Database = require('./database/db')
const save_orphanage = require('./database/save-orphanage')

module.exports = {
    index: (req, res) => {
        const city = req.query.city
        res.render('index', { city })
    },
    orphanage: async (req, res) => {
        const id = req.query.id
        try {
            const db = await Database
            const results = await db.all(`SELECT * FROM orphanages WHERE id = ${id};`)
            const orphanage = results[0]
            orphanage.images = orphanage.images.split(",")
            orphanage.first_image = orphanage.images[0]
            if (orphanage.open_on_weekends == "0") {
                orphanage.open_on_weekends = false
            }
            else {
                orphanage.open_on_weekends = true
            }
            res.render('orphanage', { orphanage: orphanage })
        }
        catch (error) {
            console.log(console.log(error))
            return res.send("ERRO NO BANCO DE DADOS")
        }
    },
    orphanages: async (req, res) => {
        try {
            const db = await Database
            const orphanages = await db.all('SELECT * FROM orphanages;')
            res.render('orphanages', { orphanages })
        }
        catch (error) {
            console.log(console.log(error))
            return res.send('ERRO NO BANCO DE DADOS')
        }
    },
    create_orphanage: (req, res) => {
        res.render('create-orphanage')
    },
    save_orphanage: async (req, res) => {
        const fields = req.body

        if (Object.values(fields).includes('')) {
            return res.send('TODOS OS CAMPOS DEVEM SER PREENCHIDOS')
        }
        else {
            try {
                const db = await Database
                await save_orphanage(db, fields)
                return res.redirect('/orphanages/')
            }
            catch (error) {
                console.log(error)
                return res.send('ERRO NO BANCO DE DADOS')
            }
        }
    }
}