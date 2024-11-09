const Restaurant = require('../models/restaurant');



exports.renderResList = async(req, res)=>{
    const districtMap = {
        dongguk: '동대입구',
        chungmuro: '충무로',
    };

    try {
        const dis = req.params.district; // URL 파라미터로 지역(district) 받기
        const rest = await Restaurant.findAll({
            where: { district: dis}
        });       

        res.render('resList', {
            title: districtMap[dis],
            restaurants: rest
        });
    } catch(error) {
        console.error(error);
        res.status(500).send('음식점 데이터를 가져오는 데 실패했습니다.');
    }
};



exports.renderDetail =async(req, res)=>{
    const resId = parseInt(req.params.id); // URL에서 ID 파라미터 추출
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


