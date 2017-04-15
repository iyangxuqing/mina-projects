var path = 'http://122.226.60.90:8092/images/cizhuang/dongpeng/fengge/'

var data = [
    {
        id: 0,
        title: '奢瓷时尚，多种风格案例随心挑',
        hImage: 's01.jpg',
        logo: 'logo.png'
    },
    {
        id: 1,
        pid: 0,
        title: '简约',
        thumb: 'xiandaijianyue/s02.jpg',
        hImage: 'xiandaijianyue/s01.jpg',
        desc: '渔灯暗，客梦回，一声声滴人心碎。孤舟五更家万里，是离人几行情泪。家，是永远的港湾却也是永远的牵挂。',
        logo: 'logo.png',
    },
    {
        id: 2,
        pid: 0,
        title: '欧式',
        thumb: 'ousi/s08.jpg',
        hImage: 'ousi/s03.jpg',
        desc: '欧式有的不只是豪华大气，更多的是惬意和浪漫。通过完美的曲线，精益求精的细节处理，带给家人不尽的舒服触感，实际上和谐是欧式风格的最高境界。',
        logo: 'logo.png'
    },
    {
        id: 3,
        pid: 0,
        title: '地中海',
        thumb: 'dizhonghai/s01.jpg',
        hImage: 'dizhonghai/s01.jpg',
        desc: '地中海风格的美，包括“海”与“天”明亮的色彩、仿佛被水冲刷过后的白墙、薰衣草、玫瑰、茉莉的香气、路旁奔放的成片花田色彩、历史悠久的古建筑、土黄色与红褐色交织而成的强烈民族性色彩。',
        logo: 'logo.png'
    },
    {
        id: 4,
        pid: 0,
        title: '中式',
        thumb: 'zhongsi/s04.jpg',
        hImage: 'zhongsi/s04.jpg',
        desc: '那承载着梦幻的中式别墅，如同明月清风般灵秀、古雅、清逸，和着一缕檀香，品享一段悠然时光，如同沉醉在一阕词中，一丛花间。',
        logo: 'logo.png'
    },
    {
        id: 5,
        pid: 0,
        title: '田园风',
        thumb: 'tianyuan/s01.jpg',
        hImage: 'tianyuan/s02.jpg',
        desc: '故人具鸡黍，邀我至田家。绿树村边合，青山郭外斜。开筵面场圃，把酒话桑麻。待到重阳日，还来就菊花。',
        logo: 'logo.png'
    },
    {
        id: 6,
        pid: 0,
        title: '复古风',
        thumb: 'fugu/s01.jpg',
        hImage: 'fugu/s01.jpg',
        desc: '这次我离开你，是风，是雨，是夜晚;你笑了笑，我摆一摆手，一条寂寞的路便展向两头了。',
        logo: 'logo.png'
    },
    {
        id: 7,
        pid: 0,
        title: '背景墙',
        thumb: 'beijingqiang/01.jpg',
        hImage: 'beijingqiang/01.jpg',
        logo: 'logo.png'
    },
    {
        id: 101,
        pid: 1,
        title: '雪花雪瑞',
        thumb: 'xiandaijianyue/s1/s02.jpg',
        images: [
            'xiandaijianyue/s1/s02.jpg',
            'xiandaijianyue/s1/s01.jpg',
            'xiandaijianyue/s1/s03.jpg',
            'xiandaijianyue/s1/s04.jpg',
            'xiandaijianyue/s1/s05.jpg',
        ],
        descs: [
            '简而不失其华，约不显其涩。这才是我们现在需要的。她不仅是一种风格，一种时尚更是一种精神向导，生活方式。'
        ]
    },
    {
        id: 102,
        pid: 1,
        title: '阁/跃',
        thumb: 'xiandaijianyue/s2/s04.jpg',
        images: [
            'xiandaijianyue/s2/s01.jpg',
            'xiandaijianyue/s2/s02.jpg',
            'xiandaijianyue/s2/s03.jpg',
            'xiandaijianyue/s2/s04.jpg',
            'xiandaijianyue/s2/s05.jpg',
            'xiandaijianyue/s2/s06.jpg',
        ],
        descs: [
            '简而不失其华，约不显其涩。这才是我们现在需要的。她不仅是一种风格，一种时尚更是一种精神向导，生活方式。'
        ]
    },
    {
        id: 103,
        pid: 1,
        title: '芳草雅灰',
        thumb: 'xiandaijianyue/s3/s07.jpg',
        images: [
            'xiandaijianyue/s3/s07.jpg',
            'xiandaijianyue/s3/s01.jpg',
            'xiandaijianyue/s3/s02.jpg',
            'xiandaijianyue/s3/s04.jpg',
            'xiandaijianyue/s3/s05.jpg',
            'xiandaijianyue/s3/s06.jpg',
        ],
        descs: ['简而不失其华，约不显其涩。这才是我们现在需要的。她不仅是一种风格，一种时尚更是一种精神向导，生活方式。'
        ]
    },
    {
        id: 104,
        pid: 1,
        title: '北美橡木',
        thumb: 'xiandaijianyue/s5/s01.jpg',
        images: [
            'xiandaijianyue/s5/s01.jpg',
            'xiandaijianyue/s5/s02.jpg',
            'xiandaijianyue/s5/s03.jpg',
            'xiandaijianyue/s5/s04.jpg',
            'xiandaijianyue/s5/s05.jpg',
            'xiandaijianyue/s5/s06.jpg'
        ],
        descs: ['简而不失其华，约不显其涩。这才是我们现在需要的。她不仅是一种风格，一种时尚更是一种精神向导，生活方式。'
        ]
    },
    {
        id: 105,
        pid: 1,
        title: '雅丝',
        thumb: 'xiandaijianyue/s4/s02.jpg',
        images: [
            'xiandaijianyue/s4/s02.jpg',
            'xiandaijianyue/s4/s03.jpg',
            'xiandaijianyue/s4/s04.jpg',
            'xiandaijianyue/s4/s05.jpg',
            'xiandaijianyue/s4/s08.jpg',
            'xiandaijianyue/s4/s01.jpg',
            'xiandaijianyue/s4/s09.jpg',

        ],
        descs: ['简而不失其华，约不显其涩。这才是我们现在需要的。她不仅是一种风格，一种时尚更是一种精神向导，生活方式。'
        ]
    },
    {
        id: 201,
        pid: 2,
        title: '和田黄玉',
        thumb: 'ousi/s1/s02.jpg',
        images: [
            'ousi/s1/s01.jpg',
            'ousi/s1/s02.jpg',
            'ousi/s1/s03.jpg',
            'ousi/s1/s04.jpg',
            'ousi/s1/s05.jpg',
        ],
        descs: ['欧式风格是整个欧洲文明的代名词。它掌握了各种手段，有了成熟的思想，知道是什么限制了对现实逼真的表达。这时，它以权威的手法表现真实。它筛选，摒弃，使其精炼。'
        ]
    },
    {
        id: 202,
        pid: 2,
        title: '黄梨木',
        thumb: 'ousi/s2/s05.jpg',
        images: [
            'ousi/s2/s01.jpg',
            'ousi/s2/s02.jpg',
            'ousi/s2/s03.jpg',
            'ousi/s2/s04.jpg',
            'ousi/s2/s05.jpg',
            'ousi/s2/s06.jpg',

        ],
        descs: ['欧式风格是整个欧洲文明的代名词。它掌握了各种手段，有了成熟的思想，知道是什么限制了对现实逼真的表达。这时，它以权威的手法表现真实。它筛选，摒弃，使其精炼。'
        ]
    },
    {
        id: 203,
        pid: 2,
        title: '英伦玉',
        thumb: 'ousi/s3/s02.jpg',
        images: [
            'ousi/s3/s01.jpg',
            'ousi/s3/s02.jpg',
            'ousi/s3/s03.jpg',
            'ousi/s3/s04.jpg',
            'ousi/s3/s05.jpg',
            'ousi/s3/s06.jpg',
            'ousi/s3/s07.jpg',
        ],
        descs: ['欧式风格是整个欧洲文明的代名词。它掌握了各种手段，有了成熟的思想，知道是什么限制了对现实逼真的表达。这时，它以权威的手法表现真实。它筛选，摒弃，使其精炼。'
        ]
    },
    {
        id: 204,
        pid: 2,
        title: '奢华古典',
        thumb: 'ousi/s4/s02.jpg',
        images: [
            'ousi/s4/s01.jpg',
            'ousi/s4/s02.jpg',
            'ousi/s4/s03.jpg',
            'ousi/s4/s04.jpg',
            'ousi/s4/s05.jpg',
            'ousi/s4/s06.jpg',
            'ousi/s4/s07.jpg',
        ],
        descs: ['欧式风格是整个欧洲文明的代名词。它掌握了各种手段，有了成熟的思想，知道是什么限制了对现实逼真的表达。这时，它以权威的手法表现真实。它筛选，摒弃，使其精炼。'
        ]
    },
    {
        id: 205,
        pid: 2,
        title: '伊朗白玉',
        thumb: 'ousi/s5/s02.jpg',
        images: [
            'ousi/s5/s02.jpg',
            'ousi/s5/s03.jpg',
            'ousi/s5/s04.jpg',
            'ousi/s5/s05.jpg',
            'ousi/s5/s08.jpg',
            'ousi/s5/s07.jpg',
            'ousi/s5/s01.jpg',
        ],
        descs: ['欧式风格是整个欧洲文明的代名词。它掌握了各种手段，有了成熟的思想，知道是什么限制了对现实逼真的表达。这时，它以权威的手法表现真实。它筛选，摒弃，使其精炼。'
        ]
    },
    {
        id: 206,
        pid: 2,
        title: '果园',
        thumb: 'ousi/s7/s01.jpg',
        images: [
            'ousi/s7/s01.jpg',
            'ousi/s7/s02.jpg',
            'ousi/s7/s03.jpg',
            'ousi/s7/s04.jpg',
            'ousi/s7/s05.jpg',
            'ousi/s7/s06.jpg',
            'ousi/s7/s07.jpg',
        ],
        descs: ['欧式风格是整个欧洲文明的代名词。它掌握了各种手段，有了成熟的思想，知道是什么限制了对现实逼真的表达。这时，它以权威的手法表现真实。它筛选，摒弃，使其精炼。'
        ]
    },
    {
        id: 207,
        pid: 2,
        title: '北欧宜家',
        thumb: 'ousi/s8/s01.jpg',
        images: [
            'ousi/s8/s01.jpg',
            'ousi/s8/s02.jpg',
            'ousi/s8/s03.jpg',
            'ousi/s8/s04.jpg',
            'ousi/s8/s05.jpg',
            'ousi/s8/s06.jpg',
            'ousi/s8/s07.jpg',
        ],
        descs: ['欧式风格是整个欧洲文明的代名词。它掌握了各种手段，有了成熟的思想，知道是什么限制了对现实逼真的表达。这时，它以权威的手法表现真实。它筛选，摒弃，使其精炼。'
        ]
    },
    {
        id: 301,
        pid: 3,
        title: '云海浪石',
        thumb: 'dizhonghai/s1/s02.jpg',
        images: [
            'dizhonghai/s1/s04.jpg',
            'dizhonghai/s1/s03.jpg',
            'dizhonghai/s1/s02.jpg',
            'dizhonghai/s1/s01.jpg',
        ],
        descs: ['想象一下，在六角白色建筑体上，覆盖蓝色圆弧穹顶，沿着山坡崖壁矗立，在湛蓝海水包围的国度，每一个角度都可以享受无边际海景，以及全世界最美丽的夕阳。'
        ]
    },
    {
        id: 302,
        pid: 3,
        title: '火山岩石',
        thumb: 'dizhonghai/s2/s01.jpg',
        images: [
            'dizhonghai/s2/s01.jpg',
            'dizhonghai/s2/s02.jpg',
            'dizhonghai/s2/s03.jpg',
            'dizhonghai/s2/s04.jpg',
        ],
        descs: ['想象一下，在六角白色建筑体上，覆盖蓝色圆弧穹顶，沿着山坡崖壁矗立，在湛蓝海水包围的国度，每一个角度都可以享受无边际海景，以及全世界最美丽的夕阳。'
        ]
    },
    {
        id: 303,
        pid: 3,
        title: '小清新',
        thumb: 'dizhonghai/s3/s07.jpg',
        images: [
            'dizhonghai/s3/s05.jpg',
            'dizhonghai/s3/s06.jpg',
            'dizhonghai/s3/s07.jpg',
            'dizhonghai/s3/s08.jpg',
        ],
        descs: ['想象一下，在六角白色建筑体上，覆盖蓝色圆弧穹顶，沿着山坡崖壁矗立，在湛蓝海水包围的国度，每一个角度都可以享受无边际海景，以及全世界最美丽的夕阳。'
        ]
    },
    {
        id: 304,
        pid: 3,
        title: '斓花',
        thumb: 'dizhonghai/s4/s01.jpg?',
        images: [
            'dizhonghai/s4/s01.jpg?',
            'dizhonghai/s4/s02.jpg?',
            'dizhonghai/s4/s03.jpg?',
            'dizhonghai/s4/s04.jpg?',
            'dizhonghai/s4/s05.jpg?',
            'dizhonghai/s4/s06.jpg?',
        ],
        descs: ['想象一下，在六角白色建筑体上，覆盖蓝色圆弧穹顶，沿着山坡崖壁矗立，在湛蓝海水包围的国度，每一个角度都可以享受无边际海景，以及全世界最美丽的夕阳。'
        ]
    },
    {
        id: 401,
        pid: 4,
        title: '现代古典',
        thumb: 'zhongsi/s1/s01.jpg',
        images: [
            'zhongsi/s1/s01.jpg',
            'zhongsi/s1/s02.jpg',
            'zhongsi/s1/s03.jpg',
            'zhongsi/s1/s04.jpg',
            'zhongsi/s1/s05.jpg',
            'zhongsi/s1/s06.jpg',
        ],
        descs: ['以一支生花妙笔，挥毫尘封百年的画卷。置身于唯美的中国意境里，忘了时间的界限，忘了世事的繁杂，仿佛在品一杯红茶，细腻绵长，历久弥香。'
        ]
    },
    {
        id: 402,
        pid: 4,
        title: '白桦木',
        thumb: 'zhongsi/s3/s01.jpg',
        images: [
            'zhongsi/s3/s01.jpg',
            'zhongsi/s3/s02.jpg',
            'zhongsi/s3/s03.jpg',
            'zhongsi/s3/s04.jpg',
            'zhongsi/s3/s05.jpg',
            'zhongsi/s3/s06.jpg',
            'zhongsi/s3/s07.jpg',
        ],
        descs: ['以一支生花妙笔，挥毫尘封百年的画卷。置身于唯美的中国意境里，忘了时间的界限，忘了世事的繁杂，仿佛在品一杯红茶，细腻绵长，历久弥香。'
        ]
    },
    {
        id: 403,
        pid: 4,
        title: '意大利木纹',
        thumb: 'zhongsi/s4/s04.jpg',
        images: [
            'zhongsi/s4/s01.jpg',
            'zhongsi/s4/s02.jpg',
            'zhongsi/s4/s03.jpg',
            'zhongsi/s4/s04.jpg',
            'zhongsi/s4/s05.jpg',
            'zhongsi/s4/s06.jpg',
        ],
        descs: ['以一支生花妙笔，挥毫尘封百年的画卷。置身于唯美的中国意境里，忘了时间的界限，忘了世事的繁杂，仿佛在品一杯红茶，细腻绵长，历久弥香。'
        ]
    },
    {
        id: 404,
        pid: 4,
        title: '天山碧玉',
        thumb: 'zhongsi/s6/s01.jpg',
        images: [
            'zhongsi/s6/s01.jpg',
            'zhongsi/s6/s02.jpg',
            'zhongsi/s6/s03.jpg',
            'zhongsi/s6/s04.jpg',
            'zhongsi/s6/s05.jpg',
        ],
        descs: ['以一支生花妙笔，挥毫尘封百年的画卷。置身于唯美的中国意境里，忘了时间的界限，忘了世事的繁杂，仿佛在品一杯红茶，细腻绵长，历久弥香。'
        ]
    },
    {
        id: 405,
        pid: 4,
        title: '尚毯',
        thumb: 'zhongsi/s7/s01.jpg',
        images: [
            'zhongsi/s7/s01.jpg',
            'zhongsi/s7/s02.jpg',
            'zhongsi/s7/s03.jpg',
            'zhongsi/s7/s04.jpg',
            'zhongsi/s7/s05.jpg',

        ],
        descs: ['以一支生花妙笔，挥毫尘封百年的画卷。置身于唯美的中国意境里，忘了时间的界限，忘了世事的繁杂，仿佛在品一杯红茶，细腻绵长，历久弥香。'
        ]
    },
    {
        id: 501,
        pid: 5,
        title: '金玉满堂',
        thumb: 'tianyuan/s1/s03.jpg',
        images: [
            'tianyuan/s1/s03.jpg',
            'tianyuan/s1/s01.jpg',
            'tianyuan/s1/s02.jpg',
            'tianyuan/s1/s04.jpg',
            'tianyuan/s1/s05.jpg',
            'tianyuan/s1/s06.jpg',
            'tianyuan/s1/s07.jpg',
            'tianyuan/s1/s08.jpg',

        ],
        descs: ['田园装修风格以展现悠闲惬意的田园之景，力求为人们展现休闲，慢生活步骤之意。田园装修风格就如同飘散的清甜乐曲，带给你轻松的诗意感受。'
        ]
    },
    {
        id: 502,
        pid: 5,
        title: '东方韵味',
        thumb: 'tianyuan/s2/s04.jpg',
        images: [
            'tianyuan/s2/s03.jpg',
            'tianyuan/s2/s01.jpg',
            'tianyuan/s2/s02.jpg',
            'tianyuan/s2/s08.jpg',
            'tianyuan/s2/s04.jpg',
            'tianyuan/s2/s05.jpg',
            'tianyuan/s2/s06.jpg',
            'tianyuan/s2/s07.jpg',

        ],
        descs: ['田园装修风格以展现悠闲惬意的田园之景，力求为人们展现休闲，慢生活步骤之意。田园装修风格就如同飘散的清甜乐曲，带给你轻松的诗意感受。'
        ]
    },
    {
        id: 503,
        pid: 5,
        title: '日式空间',
        thumb: 'tianyuan/s5/s03.jpg',
        images: [
            'tianyuan/s5/s01.jpg',
            'tianyuan/s5/s02.jpg',
            'tianyuan/s5/s03.jpg',
            'tianyuan/s5/s04.jpg',
            'tianyuan/s5/s05.jpg',
            'tianyuan/s5/s06.jpg',
            'tianyuan/s5/s07.jpg',

        ],
        descs: ['田园装修风格以展现悠闲惬意的田园之景，力求为人们展现休闲，慢生活步骤之意。田园装修风格就如同飘散的清甜乐曲，带给你轻松的诗意感受。'
        ]
    },
    {
        id: 504,
        pid: 5,
        title: '现代田园',
        thumb: 'tianyuan/s7/s01.jpg',
        images: [
            'tianyuan/s7/s01.jpg',
            'tianyuan/s7/s02.jpg',
            'tianyuan/s7/s03.jpg',
            'tianyuan/s7/s04.jpg',
            'tianyuan/s7/s05.jpg',
            'tianyuan/s7/s06.jpg',

        ],
        descs: ['田园装修风格以展现悠闲惬意的田园之景，力求为人们展现休闲，慢生活步骤之意。田园装修风格就如同飘散的清甜乐曲，带给你轻松的诗意感受。'
        ]
    },
    {
        id: 601,
        pid: 6,
        title: '欧洲榆木',
        thumb: 'fugu/s1/s02.jpg',
        images: [
            'fugu/s1/s02.jpg',
            'fugu/s1/s03.jpg',
            'fugu/s1/s04.jpg',
            'fugu/s1/s05.jpg',
            'fugu/s1/s06.jpg',
            'fugu/s1/s01.jpg',

        ],
        descs: ['仿古装修风格代表的是一种沉稳的厚重感，其内敛的表现虽没有现代风格的光鲜张扬，却更恰如其分地表达了丰富的内涵。'
        ]
    },
    {
        id: 602,
        pid: 6,
        title: '胡桃木',
        thumb: 'fugu/s2/s01.jpg',
        images: [
            'fugu/s2/s01.jpg',
            'fugu/s2/s02.jpg',
            'fugu/s2/s03.jpg',
            'fugu/s2/s04.jpg',
            'fugu/s2/s05.jpg',

        ],
        descs: ['仿古装修风格代表的是一种沉稳的厚重感，其内敛的表现虽没有现代风格的光鲜张扬，却更恰如其分地表达了丰富的内涵。'
        ]
    },
    {
        id: 603,
        pid: 6,
        title: '阿基米德',
        thumb: 'fugu/s3/s02.jpg',
        images: [
            'fugu/s3/s01.jpg',
            'fugu/s3/s02.jpg',
            'fugu/s3/s03.jpg',
            'fugu/s3/s04.jpg',
            'fugu/s3/s05.jpg',
            'fugu/s3/s06.jpg',
            'fugu/s3/s07.jpg',

        ],
        descs: ['仿古装修风格代表的是一种沉稳的厚重感，其内敛的表现虽没有现代风格的光鲜张扬，却更恰如其分地表达了丰富的内涵。'
        ]
    },
    {
        id: 604,
        pid: 6,
        title: '古韵石',
        thumb: 'fugu/s4/s01.jpg',
        images: [
            'fugu/s4/s01.jpg',
            'fugu/s4/s02.jpg',
            'fugu/s4/s03.jpg',
            'fugu/s4/s04.jpg',
            'fugu/s4/s05.jpg',

        ],
        descs: ['仿古装修风格代表的是一种沉稳的厚重感，其内敛的表现虽没有现代风格的光鲜张扬，却更恰如其分地表达了丰富的内涵。'
        ]
    },
    {
        id: 701,
        pid: 7,
        title: '新中式风',
        thumb: 'beijingqiang/s1/01.jpg',
        images: [
            'beijingqiang/s1/s01.jpg',
            'beijingqiang/s1/s02.jpg',
            'beijingqiang/s1/s03.jpg',
            'beijingqiang/s1/s04.jpg',
            'beijingqiang/s1/s05.jpg',
            'beijingqiang/s1/s06.jpg',
            'beijingqiang/s1/s07.jpg',
        ],
        slogan: ['支持任何尺寸个性定制',
        ],
        descs: ['浓浓的中国风，深深的民族情，沉稳，淡雅，就是80.90后的年轻人也为之崇拜。'
        ]
    },
    {
        id: 702,
        pid: 7,
        title: '欧式风',
        thumb: 'beijingqiang/s2/01.jpg',
        images: [
            'beijingqiang/s2/s01.jpg',
            'beijingqiang/s2/s03.jpg',
            'beijingqiang/s2/s04.jpg',
            'beijingqiang/s2/s05.jpg',
            'beijingqiang/s2/s06.jpg',
            'beijingqiang/s2/s07.jpg',
        ],
        slogan: ['支持任何尺寸个性定制',
        ],
        descs: ['欧式风格很讲究造型，既要突出凹凸感，又要有优美的线条，两种造型相映成趣。电视墙也因此在客厅中相当吸引眼球，突现出抽象的美感(个性定制，支持任何尺寸定制)。'
        ]
    },
    {
        id: 703,
        pid: 7,
        title: '简约风',
        thumb: 'beijingqiang/s3/01.jpg',
        images: [
            'beijingqiang/s1/s01.jpg',
            'beijingqiang/s3/s02.jpg',
            'beijingqiang/s3/s04.jpg',
            'beijingqiang/s3/s06.jpg',
        ],
        slogan: ['支持任何尺寸个性定制',
        ],
        descs: ['简约不等于简单，它是经过深思熟虑后经过创新得出的设计和思路的延展，不是简单的“堆砌”和平淡的“摆放”，不像有些设计师粗浅的理解的“直白”(个性定制，支持任何尺寸定制)。'
        ]
    },
    {
        id: 704,
        pid: 7,
        title: '田园风',
        thumb: 'beijingqiang/s4/01.jpg',
        images: [
            'beijingqiang/s4/s01.jpg',
            'beijingqiang/s4/s02.jpg',
            'beijingqiang/s4/s03.jpg',
            'beijingqiang/s4/s04.jpg',
            'beijingqiang/s4/s05.jpg',
        ],
        slogan: ['支持任何尺寸个性定制',
        ],
        descs: ['温馨又舒适美式田园风格特点主要包括简洁明快，是种很温馨现代的设计风格，但又明快光鲜，追求历史感但又包含了现代气息(个性定制，支持任何尺寸定制)。'
        ]
    },
]

export var ModelRoom = {
    imagePath: path,
    data: data
}
