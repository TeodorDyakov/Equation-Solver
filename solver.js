function myFunction() {
	
	const EPSILON = 0.0000001;

	function evaluateX(expr, x){
		return (eval(expr.split('x').join(x)));
	}

	function derivative(x){
		const delta = EPSILON * 100;
		return (evaluateX(expr, x + delta) - evaluateX(expr, x - delta)) / (2*delta);
	}

	function gradientDescent(min){
		const MAX_ITERATIONS = 10000;
		var prev = Math.random() + 1;
		var curr = prev + 0.001;

		var cnt = 0;
		while(Math.abs(prev - curr) > EPSILON && cnt++ < MAX_ITERATIONS){
			prev = curr;
			if(min){
				curr = curr - 0.1 * derivative(curr);
			}else{
				curr = curr + 0.1 * derivative(curr);
			}
		}
		if(curr > 1e9){
			return Infinity;
		}
		if(curr < -1e9){
			return -Infinity;
		}
		return curr;
	}

	function newton(){
		const MAX_ITERATIONS = 1000;
		var prev = Math.random() + 1;
		var curr = prev + 0.001;
		var cnt = 0;
		while(Math.abs(curr - prev) > EPSILON){
			prev = curr;
			curr = curr - evaluateX(expr, curr) / derivative(curr);

			if(cnt++ > MAX_ITERATIONS){
				return "err";
			}
		}
		return curr;	
	}
	
    var form = document.getElementById("frm1");
    var expr = form.elements[0].value;
    var sol = newton();
    var min = gradientDescent(true);
    var max = gradientDescent(false);
    
	expr = expr.split('x').join();
    if(sol == "err"){
    	document.getElementById("solution").innerHTML = "Could not find solution!";
    } else {
    	document.getElementById("solution").innerHTML = "x = " + sol.toFixed(5);
    }
    document.getElementById("min").innerHTML = "minimum at x = " + min.toFixed(5);
    document.getElementById("max").innerHTML = "maximum at x = " + max.toFixed(5);
  
}