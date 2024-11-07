const Restaurant = require('../models/restaurant');

exports.renderDongguk = async(req, res)=>{
    try {
        const donggukRestaurants = await Restaurant.findAll({
            where: { district: 'dongguk'}
        });       

        res.render('resList', {
            title: '동대입구 음식점 리스트',
            restaurants: donggukRestaurants
        });
    } catch(error) {
        console.error(error);
        res.status(500).send('음식점 데이터를 가져오는 데 실패했습니다.');
    }
};

exports.renderChungmuro = async(req, res)=>{
    try {
        const chungmuRestaurants = await Restaurant.findAll({
            where: { district: 'chungmuro'}
        });       

        res.render('resList', {
            title: '충무로 음식점 리스트',
            restaurants: chungmuRestaurants
        });
    } catch(error) {
        console.error(error);
        res.status(500).send('음식점 데이터를 가져오는 데 실패했습니다.');
    }
};

exports.renderDetail =async(req, res)=>{
    const resId = parseInt(req.params.id, 10); // URL에서 ID 파라미터 추출
    try {
        const restaurant = await Restaurant.findByPk(resId);
        res.render('detail', {
            res: restaurant
        });
    }catch(error) {
        console.error(error);
        res.status(500).send('해당 음식점 데이터를 가져오는 데 실패했습니다.');
    }
};


