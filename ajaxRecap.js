$.post
$.get
$.ajax

send it to? -> url/endpoint
send what? ->{nameofdata: data, moredata: data} send in an object
do what with it? -> callback function

$.post("localhost:3000/suggestion", {typedIn: "NYCDA"}, function(data, err){
	if (err){
		console.log(err)
	}
	console.log(data)
})

$.ajax({
	url: "localhost:3000/suggestion",
	data: {typedIn:"NYCDA"},
	method: "POST",
	success: function(data) {
	console.log(data)
	},
	failure: function (err){
	console.log(err
		)
	}
})

$.get("localhost:3000", {data: "Hi There"}, function(data) {
	console.log(data)
})

$.ajax({
	url: "localhost:3000/suggestion",
	data: {typedIn:"NYCDA"},
	method: "GET",
	success: function(data) {
	console.log(data)
	},
	failure: function (err){
	console.log(err
		)
	}
})

