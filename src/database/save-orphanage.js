function save_orphanage(db, {name, lat, lng, about, whatsapp, instructions, opening_hours, open_on_weekends, images}) {
    return db.run(`
        INSERT INTO orphanages (
            name,
            lat,
            lng,
            about,
            whatsapp,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        )
        VALUES (
            "${name}",
            "${lat}",
            "${lng}",
            "${about}",
            "${whatsapp}",
            "${instructions}",
            "${opening_hours}",
            "${open_on_weekends}", 
            "${images.toString()}"
        );
    `)
}

module.exports = save_orphanage