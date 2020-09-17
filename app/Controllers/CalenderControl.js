angular.module('myApp',[]).controller('calenderCtrl', function ($scope) {

    //Events List
    $scope.events = [];

    $scope.today = new Date();

    var Calendar = tui.Calendar;


    //Add Events Method
    $scope.addNewEvent = function () {

        if ($scope.eventName ==='' || $scope.eventStart ==='' || $scope.eventEnd ===''){
            return;
        }

        let differanceT =  $scope.eventStart.getTime()-$scope.today.getTime() ;
        let differanceD = differanceT / (1000 * 3600 * 24)
        differanceD = Math.round(differanceD);

        $scope.events.push({
            name: $scope.eventName,
            start: $scope.eventStart,
            end: $scope.eventEnd,
            edit: false,
            remain: differanceD
        });

        $scope.events.forEach(function (data) {
            data.temp = new Date(data.start).getTime();
        });

        $scope.eventName = '';
        $scope.eventStart = '';
        $scope.eventEnd = '';

        calendar.createSchedules([
            {
                calendarId: '1',
                title : $scope.eventName,
                start: $scope.eventStart,
                end: $scope.eventEnd,
                isReadOnly: true,
                category : 'time',
                dueDateClass: '',
            }
        ]);
    }

    //Remove Events Method
    $scope.deleteEvent = function (index) {

        $scope.events.splice(index,1);
    }

    //Edit Events Method
    $scope.editEvent = function (index) {

        let event = $scope.events[index];

        $scope.eventName = event.name;
        $scope.eventStart = new Date(event.start.toLocaleString());
        $scope.eventEnd = new Date(event.end.toLocaleString());
        $scope.edit = true;
        $scope.remain = event.remain;

        $scope.events.splice(index,1);
    }

    var calendar = new Calendar('#calendar', {
        defaultView: 'month',
        taskView: true,
        template: {
            monthDayname: function(dayname) {
                return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
            }
        }
    });

});
