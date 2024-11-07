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