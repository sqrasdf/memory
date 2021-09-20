// setup
var compareList = [];
var canClick = 1;
var list = [];
var gamelist = [];
var isCardClickable = [];

var number = [];
var sqrnumber = [];

function game(num)
{
  number.push(num);
  sqrnumber.push(number * number);

  document.getElementById("container").innerHTML = "";

  //var number = 4;
  var break_width = 30;
  // ^ if changing change in css file too

  // \/ setting up the site
  var paper_width = number * 100 + (number-1) * break_width;
  var a = '<div id="paper" style=" display: inline-block;  height:100px; width:' + paper_width + '"></div>';

  document.getElementById("container").innerHTML += a;

  var index = 0;
  for (var i = 0; i < number; i++)
  {
    for (var j = 0; j < number; j++)
    {
      var ans = `<div id=`+ index + ` class="card" onclick="console.log(id);show_or_hide_number(id);" ></div>`;
      if (j < number - 1)
      {
        ans += `<div class="break"></div>`;
      }
      document.getElementById("paper").innerHTML += ans;
      index++;
    }
    document.getElementById("paper").innerHTML += `<div style="clear:both;"></div>`;

    var break_floor = `<div class="break_floor" style="width:` + paper_width + `;"></div>`;
    document.getElementById("paper").innerHTML += break_floor;
  }


  var count_index = 1;
  for (var i = 0; i < sqrnumber; i++)
  {
    if (i % 2 == 0)
    {
      list.push(count_index);
      list.push(count_index);
      count_index++;
    }

    gamelist.push(0);
    isCardClickable.push(1);
  }

  function randomNumbers(max)
  {
    return Math.floor(Math.random() * max );
  }

  for (var i = 0; i < sqrnumber; i++)
  {
    var index = randomNumbers(sqrnumber-i);
    gamelist[i] = list[index];
    list.splice(index, 1);
  }
}


function hide()
{
  for (var i = 0; i < sqrnumber[0]; i++)
  {
  document.getElementById(i).innerHTML = "";
  canClick = 1;
  }
}

function site_reload()
{
  location.reload()
}

function play_nice()
{

  var lennycode = '<div id="lenny" style="color: white; font-size:60px;">( ͡° ͜ʖ ͡°)  </div>';

  document.getElementById("paper").innerHTML = lennycode;
  document.getElementById("nicemp3").innerHTML = "";
  document.getElementById("nicemp3").innerHTML = "<audio src=\"nice.mp3\" autoplay></audio>";
}

function nice_or_not_nice()
{
  var sumOfList = 0;

  for (var i in isCardClickable) {sumOfList += isCardClickable[i]}

  if (sumOfList == 0)
  {
    play_nice();
    setTimeout("site_reload()", 2800);
  }
}

function show_or_hide_number(number)
{
  if (isCardClickable[number] == 1 && canClick == 1)
  {
    if (document.getElementById(number).value == undefined && document.getElementById(number).innerHTML == ""  )
    {
      document.getElementById(number).innerHTML = gamelist[number];
    }
    else
    {
      document.getElementById(number).innerHTML = "";
    }

    compareList.push([document.getElementById(number).innerHTML, number]);

    if (compareList.length == 2)
    {
      canClick = 0;
      if (compareList[0][0] == compareList[1][0])
      {
        isCardClickable[compareList[1][1]] = 0;
        isCardClickable[compareList[0][1]] = 0;
        document.getElementById(compareList[0][1]).className = "done";
        document.getElementById(compareList[1][1]).className = "done";
        compareList = [];
        canClick = 1;
      }
      else
      {
        compareList = [];
        setTimeout("hide()", 900);
      }
    }
  }

  nice_or_not_nice();

}
