exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        console.log('로그인된 사용자 정보 : ' +  req.user);
        next();
    }else {
        //res.status(403).send('로그인 필요');
        res.redirect('/restaurant/dongguk');
    }
};

exports.isNotLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
        next();
    }else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    
    }
};