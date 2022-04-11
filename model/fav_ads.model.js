module.exports = (sequelize, Sequelize) => {
    const FavAds = sequelize.define("favorite_ads",
        {
            idfavorite_ads: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            iduser: {
                type: Sequelize.INTEGER,
            },
            idads_info: {
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.DATE,
            },
            status: {
                type: Sequelize.STRING
            },
            created_at: {
                type: Sequelize.DATE,
               // field:'createdAt'
            },
            updated_at: {
                type: Sequelize.DATE,
            },
            remove_at: {
                type: Sequelize.DATE,
            }
        }
        , {
            freezeTableName: true,
            underscored: true
        }
    );

    return FavAds;
};