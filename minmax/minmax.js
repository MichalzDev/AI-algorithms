console.log("Hello World")

var points = [4,5,6];
var goal = 21;
// main();
main()
function test()
{
    var res = [];
    res.push({key: 3, value: 5});
    res.push({key: 1, value: 5});
    res.push({key: 2, value: 6});
    var foo = res.find(x=>x.value == 6);
    console.log(foo.key);
}
function main()
{
    var tmp = MiniMax(0,0,true);
    if(tmp == -1) console.log("Vader wins");
    if(tmp ==  1) console.log("Luke wins");
    if(tmp ==  0) console.log("Tie");
}

function MiniMax(score, depth, maxingP)
{
    if(score >= goal)
    {
        return checker(score, maxingP);
    }
    if(maxingP){
        var rez = [];
        var maxEv = -10;
        points.forEach(el => {
            var tmp = score + el;
            console.log("Luke added "+ el +" to score: "+tmp+" | depth:" + depth);
            var ev = MiniMax(tmp, depth+1, false);
            maxEv = Math.max(maxEv, ev);
            rez.push({key: el, value: ev});
        });
        if(rez.find(x=>x.value == 1) === undefined)
        {
            if(rez.find(x=>x.value == 0) === undefined) 
            {
                bar = rez.find(x=>x.value == -1);
            } else 
            {
                bar = rez.find(x=>x.value == 0)
            }
        } else 
        {
            bar = rez.find(x=>x.value == 1)
        }
        score += bar.key;
        return maxEv;
    } else {
        var rez = [];
        var minEv = 10;
        points.forEach(el => {
            var tmp = score + el;
            console.log("Vader added "+ el +" to score: "+tmp+" | depth:" + depth);
            var ev = MiniMax(tmp, depth+1, true);
            minEv = Math.min(minEv, ev);
            rez.push({key: el, value: ev});
        });
        var bar;
        if(rez.find(x=>x.value == -1) === undefined)
        {
            if(rez.find(x=>x.value == 0) === undefined)
            {
                bar = rez.find(x=>x.value == 1);
            } else 
            {
                bar = rez.find(x=>x.value == 0)
            }
        } else
        {
            bar = rez.find(x=>x.value == -1)
        }
        score += bar.key;
        return minEv;
    }

}
function checker(score, player)
{
    if (score == goal)
    {
        return 0;
        
    }
    if (score > goal)
    {
        if(player)
        {
            return 1;
        }
        else
        {
            return -1;
        }
    }
    return 0;
}