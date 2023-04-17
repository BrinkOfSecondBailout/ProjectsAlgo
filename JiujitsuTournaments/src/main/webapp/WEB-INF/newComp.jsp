<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %> 
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" type="text/css" href="/css/style.css">

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" 
integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
<title>Create New Tournament</title>
</head>
<body>
<div class="container">
	<h1 class="display-1 text-center">Create a New Tournament</h1>
	<div class="create-comp">
	<form:form action="/comps/create" method="post" modelAttribute="comp">
		
		<form:label class="form-label" path="name">Name:</form:label>
		<div>
		<div>
		<form:errors path="name"/>
		</div>
		<form:input class="form-control-sm" path="name"/><br>
		</div>
		<form:label class="form-label" path="details">Details:</form:label>
		<div>
		<div>
		<form:errors path="details"/>
		</div>
		<form:input class="form-control-sm" path="details"/>
		</div>
		<form:label class="form-label" path="location">Location:</form:label>
		<div>
		<div>
		<form:errors path="location"/>
		</div>
		<form:input class="form-control-sm" path="location"/>
		</div>
		<form:label class="form-label" path="price">Price:</form:label>
		<div>
		<form:errors path="price"/>
		</div>
		<div>
		<form:input class="form-control-sm" type="number" step="1" path="price"/>
		</div>
		<form:label class="form-label" path="date">Date:</form:label>
		<div>
		<div>
		<form:errors path="date"/>
		</div>
		<form:input class="form-control-sm" type="date" path="date"/>
		</div>
		<div class="update-button">
		<input type="submit" type="button" class="btn btn-outline-primary" value="Create"/>
		</div>
	</form:form>
	</div>
	
	<div class="bottom-buttons">
	<a href="/dashboard"><button type="button" class="btn btn-outline-danger">Cancel</button></a>
	</div>
</div>
</body>
</html>