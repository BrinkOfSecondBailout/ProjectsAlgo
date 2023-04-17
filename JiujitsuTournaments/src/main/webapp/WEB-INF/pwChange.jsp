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
<title>Change Password</title>
</head>
<body>
<div class="container">
	<h1 class="display-1 text-center">Change Your Password</h1>
	
	<div class="login-form">
	<form:form action="/users/update/password/${user.id}" method="post" modelAttribute="user">
		<input type="hidden" name="_method" value="put"/>
		<form:hidden path="name"/>
		<form:hidden path="email"/>
		<form:label class="form-label" path="password">New Password:</form:label>
		<div>
		<form:errors path="password"/>
		<form:input class="form-control-sm" type="password" path="password"/><br><br>
		</div>
		<form:label class="form-label" path="confirmPw">Confirm New Password:</form:label>
		<div>
		<form:errors path="confirmPw"/>
		<form:input class="form-control-sm" type="password" path="confirmPw"/><br><br>
		</div>
		<input type="submit" type="button" class="btn btn-outline-primary" value="Update"/>
	</form:form>
	<div class="cancel-button">
	<a href="/users/edit/${user.id}"><button type="button" class="btn btn-outline-danger">Cancel</button></a>
	</div>
	</div>
	
	
</div>
</body>
</html>