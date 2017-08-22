describe("classificator.js", function() {
    before(function() {
    
        var DEBUG_MODE = true;
        var COLOR_DEBUG = "blue";
        var COLOR_EXCEPTION = "red";
        var RESPONSE_TIME = 1000; // Время на ожидание ответа о классификации от пиров
        var TRAINING_MODE = true; // Режим обучения, при котором пользователю предлагается задать классификацию вручную
        var HOSTNAME = window.location.hostname;
        
        
        
        TRAINING_MODE_2 = false; // Режим обучения, при котором определенная классификация добавляется в БД
        //var ROOT = 'http://localhost:3001';
        ROOT = 'https://signallingserverfe4e8e9b6b.herokuapp.com';
    
        console.log("Инициация класса");
        classificator = new Classificator();
        //classificator.loadKeyWordDatabase();
        classificator.loadWordsWithoutSubject();
        
        var keyWordDatabase = [];
        
        var cat = {};
        cat.name = "суд";
        cat.dic = [];
        var item = {}; item.name = "присяжн"; item.weight = 0.4; cat.dic.push(item);
        var item = {}; item.name = "суд"; item.weight = 0.8; cat.dic.push(item);
        var item = {}; item.name = "обвиня"; item.weight = 0.7; cat.dic.push(item);
        var item = {}; item.name = "заключен"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "приговорен"; item.weight = 0.7; cat.dic.push(item);
        var item = {}; item.name = "процесс"; item.weight = 0.2; cat.dic.push(item);
        var item = {}; item.name = "стат"; item.weight = 0.4; cat.dic.push(item);
        var item = {}; item.name = "уголовн"; item.weight = 0.8; cat.dic.push(item);
        var item = {}; item.name = "дел"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "государств"; item.weight = 0.5; cat.dic.push(item);
        keyWordDatabase.push(cat);
        // процесс статья уголовный дело государство
        
        var cat = {};
        cat.name = "природа";
        cat.dic = [];
        var item = {}; item.name = "дерев"; item.weight = 0.1; cat.dic.push(item);
        var item = {}; item.name = "лесн"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "птиц"; item.weight = 0.6; cat.dic.push(item);
        var item = {}; item.name = "животн"; item.weight = 0.5; cat.dic.push(item);
        var item = {}; item.name = "растен"; item.weight = 0.7; cat.dic.push(item);
        var item = {}; item.name = "наук"; item.weight = 0.2; cat.dic.push(item);
        var item = {}; item.name = "обитан"; item.weight = 0.6; cat.dic.push(item);
        var item = {}; item.name = "климат"; item.weight = 0.8; cat.dic.push(item);
        var item = {}; item.name = "жизн"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "эволюц"; item.weight = 0.6; cat.dic.push(item);
        keyWordDatabase.push(cat);
        // наука обитание климат жизнь эволюция
        
        var cat = {};
        cat.name = "компьютеры";
        cat.dic = [];
        var item = {}; item.name = "памят"; item.weight = 0.7; cat.dic.push(item);
        var item = {}; item.name = "процессорн"; item.weight = 0.9; cat.dic.push(item);
        var item = {}; item.name = "клавиатур"; item.weight = 0.9; cat.dic.push(item);
        var item = {}; item.name = "мыш"; item.weight = 0.5; cat.dic.push(item);
        var item = {}; item.name = "монитор"; item.weight = 0.8; cat.dic.push(item);
        var item = {}; item.name = "устройств"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "системн"; item.weight = 0.5; cat.dic.push(item);
        var item = {}; item.name = "питан"; item.weight = 0.4; cat.dic.push(item);
        var item = {}; item.name = "блок"; item.weight = 0.2; cat.dic.push(item);
        var item = {}; item.name = "адаптер"; item.weight = 0.9; cat.dic.push(item);
        keyWordDatabase.push(cat);
        
        var cat = {};
        cat.name = "арифметика";
        cat.dic = [];
        var item = {}; item.name = "умножен"; item.weight = 0.9; cat.dic.push(item);
        var item = {}; item.name = "делен"; item.weight = 0.9; cat.dic.push(item);
        var item = {}; item.name = "сложен"; item.weight = 0.9; cat.dic.push(item);
        var item = {}; item.name = "вычитан"; item.weight = 0.9; cat.dic.push(item);
        var item = {}; item.name = "четн"; item.weight = 0.6; cat.dic.push(item);
        var item = {}; item.name = "нечетн"; item.weight = 0.6; cat.dic.push(item);
        var item = {}; item.name = "степен"; item.weight = 0.7; cat.dic.push(item);
        var item = {}; item.name = "прост"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "дроб"; item.weight = 0.4; cat.dic.push(item);
        var item = {}; item.name = "раскрыт"; item.weight = 0.2; cat.dic.push(item);
        keyWordDatabase.push(cat);
        // умножение деление сложение вычитание четный нечетный степень простой дробь раскрытие
        
        var cat = {};
        cat.name = "физика";
        cat.dic = [];
        var item = {}; item.name = "авогадр"; item.weight = 0.7; cat.dic.push(item);
        var item = {}; item.name = "масс"; item.weight = 0.6; cat.dic.push(item);
        var item = {}; item.name = "сосуд"; item.weight = 0.4; cat.dic.push(item);
        var item = {}; item.name = "газ"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "энерг"; item.weight = 0.8; cat.dic.push(item);
        var item = {}; item.name = "формул"; item.weight = 0.6; cat.dic.push(item);
        var item = {}; item.name = "единиц"; item.weight = 0.2; cat.dic.push(item);
        var item = {}; item.name = "движен"; item.weight = 0.4; cat.dic.push(item);
        var item = {}; item.name = "уравнен"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "обь"; item.weight = 0.4; cat.dic.push(item);
        keyWordDatabase.push(cat);
        // авогадро масса сосуд газ энергия формула единица движение уравнение объем
        
        var cat = {};
        cat.name = "русский язык";
        cat.dic = [];
        var item = {}; item.name = "предлог"; item.weight = 0.7; cat.dic.push(item);
        var item = {}; item.name = "нареч"; item.weight = 0.6; cat.dic.push(item);
        var item = {}; item.name = "прав"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "точк"; item.weight = 0.4; cat.dic.push(item);
        var item = {}; item.name = "предложен"; item.weight = 0.5; cat.dic.push(item);
        var item = {}; item.name = "кавычк"; item.weight = 0.7; cat.dic.push(item);
        var item = {}; item.name = "реч"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "член"; item.weight = 0.2; cat.dic.push(item);
        var item = {}; item.name = "букв"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "знак"; item.weight = 0.1; cat.dic.push(item);
        keyWordDatabase.push(cat);
        // предлоги наречия правила точка предложения кавычки речь члены буквы знаки
        
        var cat = {};
        cat.name = "фитнес";
        cat.dic = [];
        var item = {}; item.name = "пульс"; item.weight = 0.9; cat.dic.push(item);
        var item = {}; item.name = "тренажер"; item.weight = 0.7; cat.dic.push(item);
        var item = {}; item.name = "дневник"; item.weight = 0.5; cat.dic.push(item);
        var item = {}; item.name = "спорт"; item.weight = 0.8; cat.dic.push(item);
        var item = {}; item.name = "тренировк"; item.weight = 0.6; cat.dic.push(item);
        var item = {}; item.name = "тяжел"; item.weight = 0.2; cat.dic.push(item);
        var item = {}; item.name = "вес"; item.weight = 0.1; cat.dic.push(item);
        var item = {}; item.name = "разогр"; item.weight = 0.4; cat.dic.push(item);
        var item = {}; item.name = "тонус"; item.weight = 0.3; cat.dic.push(item);
        var item = {}; item.name = "бег"; item.weight = 0.7; cat.dic.push(item);
        keyWordDatabase.push(cat);
        // пульс тренажер дневник спорт тренировка тяжелый вес разогрев тонус бег
        
        classificator.loadKeyWordDatabaseLocal(keyWordDatabase);
        
        console.log(classificator);
    });
    describe("Стеммер", function() {

        it("Обработка слова \"Зашило\"", function() {
            var expected = classificator.stemmer("Зашило");
            assert.strictEqual(expected, "Заш", "При получении основы слова \"Зашило\" результат " + expected);
        });

        it("Обработка слова \"Оловянный\"", function() {
            var expected = classificator.stemmer("Оловянный");
            assert.strictEqual(expected, "Оловя", "При получении основы слова \"Оловянный\" результат " + expected);
        });

        it("Обработка слова \"Синяя\"", function() {
            var expected = classificator.stemmer("Синяя");
            assert.strictEqual(expected, "Син", "При получении основы слова \"Синяя\" результат " + expected);
        });

        it("Обработка слова \"Стрепня\"", function() {
            var expected = classificator.stemmer("Стрепня");
            assert.strictEqual(expected, "Стрепн", "При получении основы слова \"Стрепня\" результат " + expected);
        });

        it("Обработка слова \"Китовому\"", function() {
            var expected = classificator.stemmer("Китовому");
            assert.strictEqual(expected, "Китов", "При получении основы слова \"Китовому\" результат " + expected);
        });

        it("Обработка слова \"Делать\"", function() {
            var expected = classificator.stemmer("Делать");
            assert.strictEqual(expected, "Дела", "При получении основы слова \"Делать\" результат " + expected);
        });

        it("Обработка слова \"Напившись\"", function() {
            var expected = classificator.stemmer("Напившись");
            assert.strictEqual(expected, "Нап", "При получении основы слова \"Напившись\" результат " + expected);
        });

        it("Обработка слова \"Сильного\"", function() {
            var expected = classificator.stemmer("Сильного");
            assert.strictEqual(expected, "Сильн", "При получении основы слова \"Сильного\" результат " + expected);
        });

        it("Обработка слова \"Теплую\"", function() {
            var expected = classificator.stemmer("Теплую");
            assert.strictEqual(expected, "Тепл", "При получении основы слова \"Теплую\" результат " + expected);
        });

        it("Обработка слова \"Программно\"", function() {
            var expected = classificator.stemmer("Программно");
            assert.strictEqual(expected, "Программн", "При получении основы слова \"Программно\" результат " + expected);
        });

        it("Обработка слова \"Киями\"", function() {
            var expected = classificator.stemmer("Киями");
            assert.strictEqual(expected, "Ки", "При получении основы слова \"Киями\" результат " + expected);
        });

        it("Обработка слова \"Смакуют\"", function() {
            var expected = classificator.stemmer("Смакуют");
            assert.strictEqual(expected, "Смак", "При получении основы слова \"Смакуют\" результат " + expected);
        });

        it("Обработка слова \"Широко\"", function() {
            var expected = classificator.stemmer("Широко");
            assert.strictEqual(expected, "Широк", "При получении основы слова \"Широко\" результат " + expected);
        });

        it("Обработка слова \"Письменный\"", function() {
            var expected = classificator.stemmer("Письменный");
            assert.strictEqual(expected, "Письмен", "При получении основы слова \"Письменный\" результат " + expected);
        });

        it("Обработка слова \"Шедший\"", function() {
            var expected = classificator.stemmer("Шедший");
            assert.strictEqual(expected, "Шедш", "При получении основы слова \"Шедший\" результат " + expected);
        });

        it("Обработка слова \"Качественный\"", function() {
            var expected = classificator.stemmer("Качественный");
            assert.strictEqual(expected, "Качествен", "При получении основы слова \"Качественный\" результат " + expected);
        });

        it("Обработка слова \"Дорожный\"", function() {
            var expected = classificator.stemmer("Дорожный");
            assert.strictEqual(expected, "Дорожн", "При получении основы слова \"Дорожный\" результат " + expected);
        });
    
        it("Обработка слова \"Весенний\"", function() {
            var expected = classificator.stemmer("Весенний");
            assert.strictEqual(expected, "Весен", "При получении основы слова \"Весенний\" результат " + expected);
        });

        it("Обработка слова \"Диплом\"", function() {
            var expected = classificator.stemmer("Диплом");
            assert.strictEqual(expected, "Дипл", "При получении основы слова \"Диплом\" результат " + expected);
        });

        it("Обработка слова \"Долг\"", function() {
            var expected = classificator.stemmer("Долг");
            assert.strictEqual(expected, "Долг", "При получении основы слова \"Долг\" результат " + expected);
        });

        it("Обработка пустого текстового аргумента", function() {
            var expected = classificator.stemmer("");
            assert.strictEqual(expected, "", "При получении основы слова пустого аргумента результат " + expected);
        });
    });
    
    describe("Классификация страницы", function() {
        it("Определение категории \"суд\"", function() {
            var page = "Суд — орган государства, осуществляющий правосудие в форме рассмотрения и разрешения уголовных, гражданских,\
            административных и иных категорий дел в установленном законом конкретного государства процессуальном порядке. От судов общей юрисдикции\
            отличают специализированные суды, рассматривающие особые категории дел: военные, арбитражные (торговые, хозяйственные, коммерческие),\
            таможенные, налоговые, по трудовым спорам, административные, ювенальной юстиции и др. Особая разновидность судов — конституционные суды,\
            главной функцией которых является конституционный контроль. В некоторых странах конституционный суд считается особым органом контроля\
            и не входит в судебную систему. В некоторых странах существуют также религиозные суды (например, мусульманский суд шариата) и суды на\
            основе обычаев. Чрезвычайные суды, строго говоря, не являющиеся судами в вышеуказанном смысле, создаются в случае экстраординарных\
            ситуаций — войны, революции, государственного переворота, чрезвычайного положения и т. п. Деятельность чрезвычайных судов носит\
            карательный характер и не регламентирована процессуальным правом, дела рассматриваются в закрытых заседаниях, решения не подлежат\
            обжалованию. Создание чрезвычайных судов прямо запрещено большинством современных конституций, в том числе и Конституцией России.\
            Т. В. Кудрявцева приводит множество примеров судебных процессов народного суда древних Афин, в которых умелая драматическая презентация\
            на судебных «подмостках», психологическая атака на судейские и зрительские эмоции помогала просителям выигрывать дело. Действо, которое\
            проходило в стенах гелиэя могло становиться то комедией, то трагедией, то фарсом или буффонадой, то слезливой мелодрамой или даже\
            «мыльной оперой».";
            var expected = classificator.getCategory(page);
            assert.strictEqual(expected, "суд", "При классификации страницы получен результат " + expected);
        });
        
        it("Определение категории \"компьютеры\"", function() {
            var page = "Персональный компьютер состоит из отдельных устройств и модулей: одни находятся внутри системного блока, другие к нему\
            подключаются. Последние служат для ввода или вывода информации: монитор, принтер, сканер, клавиатура, мышь и др. Внутри системного\
            блока находятся устройства для обработки и хранения информации. В зависимости от конфигурации компьютера они могут быть различными, но\
            большинство типичных системных блоков включает следующие устройства. Блок питания. Вырабатывает стабилизированные напряжения для\
            питания всех устройств, находящихся в системном блоке. От блока питания выходят многочисленные кабели, которые подключаются к\
            системной плате, дисковым накопителям и другим устройствам. Системная, или материнская, плата. Базовое устройство компьютера для\
            установки процессора, оперативной памяти и плат расширения. К ней подключаются устройства ввода/вывода, дисковые накопители и др.\
            Системная плата обеспечивает их взаимодействие, используя специальный набор микросхем системной логики, или чипсет'. На системной\
            плате также располагаются другие устройства, например микросхема BIOS, батарейка для питания часов и CMOS (память с автономным\
            питанием), тактовый генератор. Процессор. Является «сердцем» компьютера и служит для обработки информации по заданной программе.\
            Оперативная память. Используется для работы операционной системы, программ и для временного хранения текущих данных. Она выполнена в\
            виде модулей, установленных на системную плату, и может хранить информацию только при включенном питании. Видеоадаптер. Обычно\
            выполняется в виде платы расширения и служит для формирования изображения, которое потом выводится на монитор. Современные\
            видеоадаптеры содержат мощный видеопроцессор и большие объемы видеопамяти, что позволяет формировать трехмерное изображение с высоким\
            разрешением. Для недорогих компьютеров выпускаются системные платы с интегрированным видеоадаптером, и его не нужно устанавливать\
            дополнительно. Жесткий диск. Основное устройство для храпения информации в компьютере. Дисковод. Хотя дискеты уже морально устарели,\
            но дисководы для их чтения еще присутствуют в большинстве компьютеров. Привод для CD/DVD. CD/DVD широко используются для\
            распространения информации, поэтому приводы есть почти в каждом компьютере. Платы расширения. При необходимости в системный блок\
            можно установить дополнительные устройства, выполненные в виде плат или карт расширения. Примерами таких устройств могут быть модемы,\
            сетевые платы, ТВ-тюнеры и многие другие.";
            var expected = classificator.getCategory(page);
            assert.strictEqual(expected, "компьютеры", "При классификации страницы получен результат " + expected);
        });
        
        it("Определение категории \"фитнес\"", function() {
            var page = "Самая главная мышца нашего тела, это не  бицепс,  и даже не грудные. Самая главная для человека мышца – это сердце. От его\
            тренированности и размера зависит не просто ваш внешний вид.  От этого на прямую зависит, где вы будите лежать после 60 лет – на пляже\
            или под землей.  У большинства людей и тренеров, как оказалось, в голове полный бардак по поводу правильной тренировки  сердца.\
            Поэтому, добрый мальчик Денис Борисов, в моем лице, сегодня будет вам рассказывать много интересных и жизненно важных  вещей по поводу\
            правильной и не правильной тренировки сердца. Человеческое сердце сильное.  Перегоняя регулярно кровь через все тело, оно создает\
            такое чудовищное давление, которое способно вытолкнуть струю крови на длину 9 метров.  Человеческое сердце чудовищно выносливое.  Оно\
            постоянно,  без отдыха, сокращается,  доходя до чудовищной цифры – более 40.000.000. сокращений в год.   Такая  фантастически большая\
            нагрузка  не проходит даром и является причиной весьма мрачной статистики  сердечнососудистых  заболеваний в современном мире.\
            «Моторы» сплошь и рядом либо не правильно используют, либо губят «моторесурс» работой в  неправильном режиме.  А между тем настроить\
            работу сердца и тренировать его весьма легко.  И чуть позже я вам расскажу о правильных и эффективных методах тренировки сердечно\
            – сосудистой системы. Кстати, те кто думает, что им особенно это не нужно: дескать не вижу прикладного  значения тренированности сердца!\
            ВЫ, ребята и девчата, очень сильно ошибаетесь, потому что тренированное сердце повышает функциональность и выносливость.  Бывает\
            человек очень сильный физически, а после работы 30-60 секунд весь потный и начинает задыхаться, хотя силы вроде бы в мышцах есть.\
            Это особенно часто бывает среди тех ребят, которые занимаются единоборствами.   Смотришь, вроде бы человек здоровый, а через минуту\
            весь красный и с открытым ртом – бери и делай с ним что хочешь.  Почему так? Сердечно сосудистая система  и выносливость. Сердце – в\
            широком смысле электрический «насос», который  постоянно гоняет кровь по трубам (сосудам) нашего тела.  Это система, в общем то, и\
            называется сердечно-сосудистой! Ее задача – снабжать все клетки и органы нашего тела необходимым количеством кислорода и других\
            питательных веществ,  нужных для жизнедеятельности.  Поняв это, вы можете увидеть несколько зависимостей важных для понимания\
            эффективной работы сердца.";
            var expected = classificator.getCategory(page);
            assert.strictEqual(expected, "фитнес", "При классификации страницы получен результат " + expected);
        });
        
        it("Определение категории \"арифметика\"", function() {
            var page = "Арифметика  — элементарный раздел математики, изучающий простейшие виды чисел (натуральные, целые, рациональные) и\
            простейшие арифметические операции над ними (сложение, вычитание, умножение, деление). С глубокой древности работа с числами\
            подразделялась на две различные области: одна касалась непосредственно свойств чисел, другая была связана с техникой счета. Под\
            «арифметикой» во многих странах обычно имеется ввиду именно эта последняя область, которая несомненно является старейшей отраслью\
            математики. На сегодняшний день главными арифметическими операциями есть сложение, вычитание, умножение, деление, возведение в\
            степень, извлечение корня. Рассмотрим их немножко подробнее.  Сложение – это операция нахождения суммы двух или нескольких чисел,\
            где под суммой понимается общее количество единиц, содержащихся в рассматриваемых числах вместе. Эти числа называются слагаемыми.\
            Например, 16 + 8 = 24. Здесь 16 и 8 – слагаемые, 24 – сумма. Если слагаемые поменять местами, то сумма не изменится: 16 + 8 = 24 и\
            8 + 16 = 24. Вычитание является действием, обратным к сложению, так как это операция нахождения одного из слагаемых по сумме и\
            другому слагаемому. Вычесть из одного числа ( уменьшаемого ) другое ( вычитаемое ) - значит найти такое третье число ( разность ),\
            которое при сложении с вычитаемым   дает уменьшаемое:  24 – 8 = 16. Здесь 24 – уменьшаемое, 8 – вычитаемое, 16 – разность. Умножение.\
            Умножить одно число n ( множимое ) на другое целое число m ( множитель ) - значит повторить множимое n в качестве слагаемого  m   раз.\
            Результат умножения называется произведением . Запись операции умножения:   n ? m   или   n •   m .   Например, 12 ? 4 = 12 + 12 + 12\
            + 12 = 48. Таким образом, 12 ? 4 = 48  или 12 • 4 = 48. Здесь 12 – множимое, 4 – множитель, 48 – произведение. Если множимое   n   и\
            множитель  m   поменять местами, то произведение не изменится. Например, 12 · 4 = 12 + 12 + 12 + 12 = 48  и соответственно, 4 · 12\
            = 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 + 4 = 48. Поэтому множимое и множитель часто называются сомножителями .  Деление является\
            действием, обратным к умножению, так как это операция нахождения одного из сомножителей по произведению и другому сомножителю:\
            Разделить одно число ( делимое ) на другое ( делитель ) – значит найти такое третье число ( частное ), которое при умножении на\
            делитель даёт делимое:  48 : 4 = 12. Здесь 48 – делимое,    4 – делитель, 12 – частное. Частное от деления одного целого числа на\
            другое целое число может и не быть целым числом. Тогда это частное представляется в виде дроби . Если частное – целое число, то\
            говорят, что эти числа делятся нацело . В противном случае мы выполняем деление с остатком . Пример: 23 не делится на 4, в этом\
            случае мы можем записать: 23 = 5 · 4 + 3. Здесь 3 – остаток .  Возведение в степень. Возвести число ( основание степени ) в целую\
            степень ( показатель степени ) – значит повторить его сомножителем столько раз, каков показатель степени. Результат называется\
            степенью.";
            var expected = classificator.getCategory(page);
            assert.strictEqual(expected, "арифметика", "При классификации страницы получен результат " + expected);
        });
    });
});