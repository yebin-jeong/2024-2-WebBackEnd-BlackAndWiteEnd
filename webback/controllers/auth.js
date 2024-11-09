const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Reivew = require('../models/review');


exports.join = async (req,res,next) => {
    const {email, nick, password} = req.body;
    if (!email || !nick || !password) {
        return res.redirect('/join?error=null');
    }
    try {
        const exUser = await User.findOne({where: {email}});
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

exports.login = (req,res,next) => {
    passport.authenticate('local', (authError,user,info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, async (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            const restaurant = await Restaurant.findByPk(req.user.id, {
                include: [{
                    model: Reivew,  // Review 모델을 포함시킴
                    as: 'reviews'   // Review와의 관계 이름 (모델 정의 시 설정한 이름)
                }]
            });
            res.render('detail', {
                res: restaurant,
                reviews: restaurant.reviews, //해당 음식점의 리뷰 정보 전달
                user: req.user.id //로그인한 사용자 정보 전달
            });
        });
    })(req,res,next);
};

exports.logout = (req,res) => {
    req.logout(()=> {
        res.redirect('/');
    });
};
