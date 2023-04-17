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
<title>Edit Tournament Info</title>
</head>
<body>
<div class="container">
	<h1 class="display-1 text-center">Edit Tournament Information</h1>
	
	<div class="edit-comp">
	<form:form action="/comps/update/${comp.id}" method="post" modelAttribute="comp">
		<input type="hidden" name="_method" value="put"/>
		<form:label class="form-label" path="name">Name:</form:label>
		<div>
		<form:errors path="name"/>
		<form:input class="form-control-sm" path="name"/><br><br>
		</div>
		<form:label class="form-label" path="details">Details:</form:label>
		<div>
		<form:errors path="details"/>
		<form:input class="form-control-sm" path="details"/><br><br>
		</div>
		<form:label class="form-label" path="location">Location:</form:label>
		<div>
		<form:errors path="location"/>
		<form:input class="form-control-sm" path="location"/><br><br>
		</div>
		<form:label class="form-label" path="price">Price:</form:label>
		<div>
		<div>
		<form:errors path="price"/>
		</div>
		<form:input class="form-control-sm" type="number" step="1" path="price"/><br><br>
		</div>
		<form:label class="form-label" path="date">Date:</form:label>
		<div>
		<div>
		<form:errors path="date"/>
		</div>
		<form:input class="form-control-sm" type="date" path="date"/><br><br>
		</div>
		<input type="submit" type="button" class="btn btn-outline-primary" value="Update"/>
	</form:form>
	<a href="/comps/${comp.id}"><button class="cancel-button btn btn-outline-danger" type="button" >Cancel</button></a>
	</div>
	
</div>
</body>
</html>