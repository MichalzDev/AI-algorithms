var bar = [];
var afterNotmalization = [];
document.getElementById('file').onchange = function(){

    var file = this.files[0];
    var foo = [];
    var reader = new FileReader();

    reader.onload = function(progressEvent){  
      var lines = this.result.split('\n');
      lines.forEach(el => {
         foo.push(el.split('\t'));
      });
      foo.forEach(el => {
              var string = el[0];
              var temp = new Array();
              temp = string.split(',');
              for(i in temp) {
                  temp[i] = parseFloat(temp[i])
              }
              bar.push(temp);
          }
      );
      var somsiedzi = getNeighbours(bar, bar[0], 3);
      var res = getResponce(somsiedzi);
      console.log("Acc:"+getAccuracy(somsiedzi,res[1]));
    };
    reader.readAsText(file);
  };
  function normalize()
  {
      bar.forEach(el => {
          var min = Math.min(...el);
          var max= Math.max(...el);
          var tmp = new Array();
          el.forEach(elem => {
              tmp.push((elem - min) / (max - min)); 
          });
          afterNotmalization.push(tmp);
      });
    //   console.log("After normalization");
    //   console.log(afterNotmalization);
  }
  function distance(query, attr)
  {
      var dist = 0;
      for(let i=0; i < query.length; i++){
          dist += Math.pow((query[i]- attr[i]),2);
      }
      return Math.sqrt(dist);
  }
  function getNeighbours(bar, bar0, k){
      var distan = new Array()
      for(let i=0; i < bar.length; i++) {
          var dist = distance(bar0, bar[i]);
          distan.push([bar[i],dist]);
      }
      distan.sort(compareSecondColumn);
      var somsiad = new Array();
      for(let i=0; i < k; i++){
          somsiad.push(distan[i][0])
      }
    //   console.log(somsiad);
      return somsiad;
  }
  function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
function getResponce(somsiad){
    var classVotes = new Map();
    for(let i=0; i< somsiad.length; i++){
        var res = somsiad[i].slice(-1);
        // console.log("res: "+res);
        // console.log(classVotes.has(res[0]));
        if(classVotes.has(res[0]))
        {
            var value = classVotes.get(res[0]);
            // console.log("value: "+value)
            classVotes.set(res[0],value+1);
        } else {
            classVotes.set(res[0],1);
        }
        // console.log(classVotes)
    }
    // var sortedVotes = classVotes.sort(compareSecondColumn);
    var sortedVotes = new Map([...classVotes.entries()].sort((a, b) => b[1] - a[1])); //sort((a, b) => b[1] - a[1])
    // console.log("sorted")
    // console.log(sortedVotes)
    let mapIter = sortedVotes.entries();
    var lorem = mapIter.next().value;
    // console.log(lorem);
    return lorem;
}
function getAccuracy(testSet, repeat){
    // console.log(testSet.length);
    return repeat / testSet.length * 100;
}



