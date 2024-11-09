const Restaurant = require('../models/restaurant');
const User = require('../models/user');

exports.renderProfile =(req, res)=>{
    res.render('profile', {title: '내정보 - 동국요리사'});
};

exports.renderJoin =(req, res)=>{
    res.render('join', {title: '회원가입 - 동국요리사'});
};

exports.renderMain =(req, res,next)=>{
    const twits = [];
    res.render('main', {title: '동국요리사', twits});
};
exports.renderLogin =(req, res,next)=>{
    res.render('login', {title: '로그인'});
};

exports.followRestaurant = async (req, res,next) => {
    
    
    try {
        const user = await User.findOne({where:{id:req.user.id}});
        const restaurantId = parseInt(req.params.restaurantId, 10);

        if (user) {
            await user.addFollowing(restaurantId);
            res.send('해당 음식점을 찜했습니다.');
        }else {
            res.status(404).send('사용자가 확인되지 않습니다.');
        } 
    }catch(error){
            console.error(error);
            next(error);
    }
    
};


exports.unFollowRestaurant = async (req, res,next) => {
    
    
    try {
        const user = await User.findOne({where:{id:req.user.id}});
        const restaurantId = parseInt(req.params.restaurantId, 10);

        if (user) {
            await user.removeFollowing(restaurantId);
            res.send('해당 음식점을 찜 취소했습니다.');
        }else {
            res.status(404).send('사용자가 확인되지 않습니다.');
        } 
    }catch(error){
            console.error(error);
            next(error);
    }
    
};
