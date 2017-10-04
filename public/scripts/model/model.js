'use strict';
(function(module) {

  var info = {};

  info.all = [];

  info.getData = function(){
    $.ajax({
      url: '/info',
      method: 'GET',
      headers: {
        name: info.name,
        age: info.age,
        human: info.human,
      },
    }).then(data => {
      console.log(data);
    });
  };

  info.getData();

  info.insertData = function(){
    $.ajax({
      url: '/info',
      method: 'POST',
      headers:{
        name: info.name,
        age: info.age,
        human: info.human,
      },
    }).then(data => {
      info.all = data;
      console.log(info.all);
    });
  };

  info.deleteData = function(){
    $.ajax({
      url: '/info',
      method: 'DELETE',
      data: {
        id: '2',
      },
    });
  };

  info.deleteData();

  $('#submit').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    console.log('submitted');
    info.name = $('.name-input').val();
    info.age = $('.age-input').val();
    info.human = $('.human-input').val();
    console.log(info);

    info.insertData();
    console.log(info.all);

  });

})(window);
