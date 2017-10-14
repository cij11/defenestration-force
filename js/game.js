$.ajax({
  type: 'POST',
  url: "https://g6arya4tcf.execute-api.ap-southeast-1.amazonaws.com/prod",
  headers: {
      "Content-Type":"text/plain",
  },
  data: JSON.stringify(
    {"min":100, "max":1000}
  )
}).done(function(data) {
  console.log("Starting POST experiment:");
  console.log(data);
  console.log(data.body.generatedNum);
});
