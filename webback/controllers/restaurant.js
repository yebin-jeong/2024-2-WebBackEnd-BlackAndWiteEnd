const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const Sequelize = require('sequelize');


exports.renderResList = async (req, res) => {
    const districtMap = {
        dongguk: '동대입구',
        chungmuro: '충무로',
    };

    try {
        const dis = req.params.district;

        const resList = await Restaurant.findAll({
            where: { district: dis },
            include: [{
                model: Review,
                as: 'reviews',
            }],
        });

        for (const restaurant of resList) {
            const followCount = await restaurant.countFollowers();
            restaurant.followCount = followCount; // 레스토랑 객체에 찜 개수 추가
            restaurant.reviewCount = Number(restaurant.reviews.length); //총 리뷰 수 계산
            // 평균 별점 계산
            restaurant.avgRating = (restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) / restaurant.reviewCount || 0).toFixed(1);
        }
        
        res.render('resList', {
            title: districtMap[dis],
            restaurants: resList,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('음식점 데이터를 가져오는 데 실패했습니다.');
    }
};


exports.renderDetail = async (req, res) => {
    const resId = parseInt(req.params.id); // URL에서 ID 파라미터 추출
    try {
        const user = req.user;
        let userFollow = false;
        
        const restaurant = await Restaurant.findByPk(resId, {
                include: [{
                    model: Review,  // Review 모델을 포함시킴
                    as: 'reviews'   // Review와의 관계 이름 (모델 정의 시 설정한 이름)
                }]
            });
        //찜
        if (user) {
                const followings = await user.getFollowings({ where: { id: restaurant.id } });
                userFollow = followings.length > 0; // 팔로잉이 있으면 true, 없으면 false
        }

        const followCount = await restaurant.countFollowers(); // 찜 개수 가져오기
        // 총 리뷰 수 계산
        const reviewCount = restaurant.reviews.length;

        // 평균 별점 계산 (NaN 처리 및 소수점 1자리까지 반올림)
        const avgRating = reviewCount > 0 ?(restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount).toFixed(1) : 0;

            res.render('detail', {
                res: restaurant,
                reviews: restaurant.reviews, //레스토랑별 리뷰
                average_rating: avgRating,  // 평균 별점
                review_count: reviewCount,  // 총 리뷰 수
                favorite_count: followCount,
                userFollow: userFollow
            });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('해당 음식점 데이터를 가져오는 데 실패했습니다.');
    }
};


//리뷰 등록
exports.post = async (req, res) => {
    try {
        const { content, rating } = req.body;
        const restaurantId = req.params.id;

        // 리뷰 등록
        const review = await Review.create({
            content: content,
            rating: rating,
            restaurantId: restaurantId,
            userId: req.user.id  // 로그인한 사용자의 ID를 사용
        });
        console.log('리뷰 등록을 성공 했습니다.');
        //res.send('리뷰가 등록되었습니다.');
        //console.log('리뷰 등록을 성공 했습니다.ddd');
    } catch (error) {
        console.error(error);
        res.status(500).send('리뷰 등록에 실패했습니다.');
    }
};