const $calBody = document.querySelector('.cal-body');

// 이전 달, 다음 달
const $btnPrevMonth = document.querySelector('.btn.prev-month');
const $btnNextMonth = document.querySelector('.btn.next-month');

// 이전 년, 다음 년
const $btnPrevYear = document.querySelector('.btn.prev-year');
const $btnNextYear = document.querySelector('.btn.next-year');

// input 값
const $input = document.querySelector('.date-value')

$btnPrevMonth.addEventListener('click', () => {
    loadYYMM(init.prevMonth())
});
$btnNextMonth.addEventListener('click', () => {
    loadYYMM(init.nextMonth())
});

$btnPrevYear.addEventListener('click', () => loadYYMM(init.prevYear()));
$btnNextYear.addEventListener('click', () => loadYYMM(init.nextYear()));





$calBody.addEventListener('click', (e) => {
    console.log(e.target.dataset.fdate)
    $input.value = e.target.dataset.fdate;
});


const init = {
    monList: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayList: ['일', '월', '화', '수', '목', '금', '토'],
    currentDate: new Date(),
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    getFirstDay: (yy, mm) => new Date(yy, mm, 1),
    getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
    prevMonth: function () {
        let d = this.currentDate
        d.setDate(1);
        d.setMonth(--this.currentMonth);
        return d;
    },
    prevYear: function () {
        let d = this.currentDate
        d.setDate(1);
        d.setFullYear(--this.currentYear)
        return d;
    },
    nextMonth: function () {
        let d = this.currentDate
        d.setDate(1);
        d.setMonth(++this.currentMonth);
        return d;
    },
    nextYear: function () {
        let d = this.currentDate
        d.setDate(1);
        d.setFullYear(++this.currentYear)
        return d;
    },
    addZero: (num) => (num < 10) ? '0' + num : num,
    activeDTag: null,
};

/**
 * @param {number} date
 * @param {number} dayIn
 */
function loadDate (date, dayIn) {
    document.querySelector('.cal-date').textContent = date;
    document.querySelector('.cal-day').textContent = init.dayList[dayIn];
}

/**
 * @param {date} fullDate
 */
function loadYYMM (fullDate) {
    // 연도
    let yy = fullDate.getFullYear();
    // 달
    let mm = fullDate.getMonth();
    // 첫번째 날 구하기
    let firstDay = init.getFirstDay(yy, mm);
    // 마지막날
    let lastDay = init.getLastDay(yy, mm);



    document.querySelector(".cal-month").textContent = init.monList[mm];
    document.querySelector('.cal-year').textContent = `${yy}년`;

    let trtd = '';
    let startCount;
    let countDay = 0;
    for (let i = 0; i < 6; i++) {
        trtd += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && !startCount && j === firstDay.getDay()) {
                startCount = 1;
            }
            if (!startCount) {
                trtd += '<td>'
            } else {
                let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay + 1);
                trtd += '<td class="day';
                trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
            }
            trtd += (startCount) ? ++countDay : '';
            if (countDay === lastDay.getDate()) {
                startCount = 0;
            }
            trtd += '</td>';
        }
        trtd += '</tr>';
    }
    $calBody.innerHTML = trtd;
}

function initialLoading (fullDate) {
    // 연도
    let yy = fullDate.getFullYear();
    // 달
    let mm = fullDate.getMonth();
    // 첫번째 날 구하기
    let firstDay = init.getFirstDay(yy, mm);
    // 마지막날
    let lastDay = init.getLastDay(yy, mm);


    document.querySelector(".cal-month").textContent = init.monList[mm];
    document.querySelector('.cal-year').textContent = `${yy}년`;

    let trtd = '';
    let startCount;
    let countDay = 0;
    for (let i = 0; i < 6; i++) {
        trtd += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && !startCount && j === firstDay.getDay()) {
                startCount = 1;
            }
            if (!startCount) {
                trtd += '<td>'
            } else {
                let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(countDay + 1);
                trtd += '<td class="day';
                trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
            }
            trtd += (startCount) ? ++countDay : '';
            if (countDay === lastDay.getDate()) {
                startCount = 0;
            }
            trtd += '</td>';
        }
        trtd += '</tr>';
    }
    $calBody.innerHTML = trtd;
}


initialLoading(init.currentDate);




