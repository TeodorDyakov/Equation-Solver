function myFunction() {
	
	const EPSILON = 0.0000001;

	function evaluateX(expr, x){
		return eval(expr.split('x').join(x));
	}

	function derivative(x){
		const delta = EPSILON * 100;
		return (evaluateX(expr, x + delta) - evaluateX(expr, x - delta)) / (2*delta);
	}

	function newton(){
		const RESTARTS = 1000;
		const MAX = 1000;
		var sol = new Set();
		for(var i = 0; i < RESTARTS; i++){
			const MAX_ITERATIONS = 100;
			var prev = Math.random() * MAX - MAX/2;
			var curr = prev + 1;
			var cnt = 0;
			while(Math.abs(curr - prev) > EPSILON){
				prev = curr;
				curr = curr - evaluateX(expr, curr) / derivative(curr);

				if(cnt++ > MAX_ITERATIONS){
					return "err";
				}
			}
			sol.add(curr.toFixed(5));
		}
		return sol;	
	}
	
    var form = document.getElementById("frm1");
    var expr = form.elements[0].value;
    var sol = newton();
   	var arr = Array.from(sol);
   	var text = "";
   	for(var i = 0; i < arr.length; i++){
   		text += "x" + i +"=" + arr[i] + "<br>";
   	}
    if(sol == "err"){
    	document.getElementById("solution").innerHTML = "Could not find solution!";
    } else {
    	document.getElementById("solution").innerHTML = text;
    }
  
}