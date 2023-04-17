<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" type="text/css" href="/css/style.css">

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" 
integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
<title>Create a Message</title>
</head>
<body>


<div class="container">
	<h1 class="display-1 text-center">Write a Message To ${receiver.name}</h1>
	
	<div class="dashboard">
	<div class="create-message">
	<form:form action="/messages/process/${receiver.id}" method="post" modelAttribute="message">
		<form:label class="form-label" path="text">Message:</form:label>
		<div class="message-box">
			<div>
			<form:errors path="text"/>
			</div>
			<form:textarea class="form-control-lg" rows="7" path="text"/><br>
		</div>
		
		<div>
		<input type="submit" type="button" class="btn btn-outline-primary" value="Send Message"/>
		</div>
	</form:form>
	</div>
	
	<div class="bottom-buttons">
	<a href="/dashboard"><button type="button" class="btn btn-outline-danger">Cancel</button></a>
	</div>
	</div>
</div>


</body>
</html>