const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const { isLoggedIn } = require('../middlewares');



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


exports.renderDetail = async (req, res) => {
    const resId = parseInt(req.params.id); // URL에서 ID 파라미터 추출
    try {
        const restaurant = await Restaurant.findByPk(resId);
        const followCount = await restaurant.countFollowers(); // 찜 개수 가져오기
        restaurant.favorite_count = followCount;

        console.log('도착');
        const resId = parseInt(req.params.id, 10); // URL에서 ID 파라미터 추출
        try {
            const restaurant = await Restaurant.findByPk(resId, {
                include: [{
                    model: Review,  // Review 모델을 포함시킴
                    as: 'reviews'   // Review와의 관계 이름 (모델 정의 시 설정한 이름)
                }]
            });
            res.render('detail', {
                res: restaurant,
                reviews: restaurant.reviews, //해당 음식점의 리뷰 정보 전달
                // user: user //로그인한 사용자 정보 전달
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('해당 음식점 데이터를 가져오는 데 실패했습니다.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('해당 음식점 데이터를 가져오는 데 실패했습니다.');
    }
};


//리뷰 등록
exports.post = async (req, res) => {
    try {
        const { content, rating } = req.body;
        const userId = req.user.id; // 로그인한 사용자의 ID
        const restaurantId = req.params.id;

        // 리뷰 등록
        const restaurant = await Restaurant.findByPk(restaurantId);
        const review = await Reivew.create({
            content: content,
            rating: rating,
            restaurantId: restaurantId,
            UserId: req.user.id  // 로그인한 사용자의 ID를 사용
        });
        console.log('리뷰 등록을 성공 했습니다.');

        // 리뷰를 등록한 후, 해당 음식점의 최신 리뷰를 다시 조회
        const updatedRestaurant = await Restaurant.findByPk(restaurantId, {
            include: [{
                model: Review,  // Review 모델을 포함시킴
                as: 'reviews'   // Review와의 관계 이름
            }]
        });
        // 음식점과 최신 리뷰들을 렌더링
        res.render('detail', {
            res: updatedRestaurant,  // 음식점 정보
            reviews: updatedRestaurant.reviews  // 최신 리뷰 목록
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('리뷰 등록에 실패했습니다.');
    }
};