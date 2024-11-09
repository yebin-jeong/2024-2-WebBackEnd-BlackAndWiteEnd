const Restaurant = require('../models/restaurant');



exports.renderResList = async(req, res)=>{
    const districtMap = {
        dongguk: '동대입구',
        chungmuro: '충무로',
    };

    try {
        const dis = req.params.district; // URL 파라미터로 지역(district) 받기
        const resList = await Restaurant.findAll({
            where: { district: dis}
        });       

        // 각 레스토랑의 찜 개수 계산
    for (const restaurant of resList) {
      const followCount = await restaurant.countFollowers();
      restaurant.followCount = followCount; // 레스토랑 객체에 찜 개수 추가
    }

        res.render('resList', {
            title: districtMap[dis],
            restaurants: resList
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
        const followCount = await restaurant.countFollowers(); // 찜 개수 가져오기
        restaurant.favorite_count = followCount;

        res.render('detail', {
            res: restaurant,
        });
    }catch(error) {
        console.error(error);
        res.status(500).send('해당 음식점 데이터를 가져오는 데 실패했습니다.');
    }
};


