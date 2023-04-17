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
<title>Edit User Profile</title>
</head>
<body>
<div class="container">

	
	<h1 class="display-1 text-center">Edit your User Profile</h1>
	<div class="text-center">
	<a href="/dashboard">return to dashboard</a>
	</div>
	
	<div class="user-form">
	<form:form action="/users/update/${user.id}" method="post" modelAttribute="user">
		<input type="hidden" name="_method" value="put"/>
		<form:label class="form-label" path="name">Name:</form:label>
		<div class="form-entry">
		<form:errors path="name"/>
		<form:input class="form-control-sm" path="name"/>
		</div>
		<form:label class="form-label" path="email">Email:</form:label>
		<div class="form-entry">
		<form:errors path="email"/>
		<form:input class="form-control-sm" type="email" path="email"/><br><br>
		</div>
		<form:label class="form-label" path="belt">Belt:</form:label>
		<div class="form-entry">
		<form:select class="form-control-sm" path="belt">
			<form:option value="White">White</form:option>
			<form:option value="Blue">Blue</form:option>
			<form:option value="Purple">Purple</form:option>
			<form:option value="Brown">Brown</form:option>
			<form:option value="Black">Black</form:option>
		</form:select>
		</div>
		<form:hidden path="password"/>
		<form:hidden path="confirmPw"/>
		
		<div class="update-button">
		<input type="submit" type="button" class="btn btn-outline-primary" value="Update"/>
		</div>
		
	</form:form>
	</div>
	
	<div class="bottom-buttons">
	<a href="/users/password/${user.id}"><button type="button" class="btn btn-outline-primary">Change your Password</button></a>
	<a href="/users/delete/${user.id}"><button type="button" class="btn btn-outline-danger">Delete User</button></a>
	</div>
</div>
</body>
</html>