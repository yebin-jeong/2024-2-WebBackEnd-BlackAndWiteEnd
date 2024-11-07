exports.renderDongguk =(req, res)=>{
    const dongguk = [
        { id:4, name: '동대분식', type: '분식' },
        { id:5, name: '동국짬뽕', type: '중식' },
        { id:6, name: '오뚜기카페', type: '카페' }
    ];

    res.render('resList', {
        title: '동대입구 음식점 리스트',
        restaurants: dongguk
    });
};

exports.renderChungmuro =(req, res)=>{
    const chungmu = [
        { id:1, name: '충무로분식', type: '분식' },
        { id:2, name: '충무로중식', type: '중식' },
        { id:3, name: '충무로카페', type: '카페' }
    ];

    res.render('resList', {
        title: '충무로 음식점 리스트',
        restaurants: chungmu
    });
};

exports.renderDetail =(req, res)=>{
    const restaurantId = parseInt(req.params.id, 10); // URL에서 ID 파라미터 추출
    res.render('detail', {
        title: '충무로 음식점 리스트',
        resId: restaurantId
    });
};


