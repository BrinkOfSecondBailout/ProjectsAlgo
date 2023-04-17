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

<title>Jiujitsu Tournaments</title>

</head>


<body>
	<header class="header-login">
		<h1 class="display-1 text-center">Jiujitsu Tournaments Database</h1>
	</header>
	<div class="index-container">
	<div class="register-form">
	<h1 class="display-4 text-center">Register</h1>
	
	<img class="bg-pic-middle" src="/img/triangle2.png" alt="jiujitsu-bg">
	
	<form:form action="/register" method="post" modelAttribute="newUser">
		<form:label class="form-label" path="name">Name:</form:label>
		<div>
		<form:errors path="name"/>
		<form:input class="form-control-sm" path="name"/><br><br>
		</div>
		<form:label class="form-label" path="email">Email:</form:label>
		<div>
		<form:errors path="email"/>
		<form:input class="form-control-sm" type="email" path="email"/><br><br>
		</div>
		<form:label class="form-label" path="password">Password:</form:label>
		<div>
		<form:errors path="password"/>
		<form:input class="form-control-sm" type="password" path="password"/><br><br>
		</div>
		<form:label class="form-label" path="confirmPw">Confirm PW:</form:label>
		<div>
		<form:errors path="confirmPw"/>
		<form:input class="form-control-sm" type="password" path="confirmPw"/><br><br>
		</div>
		<input type="submit" value="Submit"/>
	</form:form>
	</div>
	
	<div class="login-form">
	<h1 class="display-4 text-center">Log in</h1>
	<form:form action="/login" method="post" modelAttribute="newLogin">
		<form:label class="form-label" path="email">Email:</form:label>
		<div>
		<form:errors path="email"/>
		<form:input class="form-control-sm" type="email" path="email"/><br><br>
		</div>
		<form:label class="form-label" path="password">Password:</form:label>
		<div>
		<form:errors path="password"/>
		<form:input class="form-control-sm" type="password" path="password"/><br><br>
		</div>
		<input type="submit" value="Submit"/>
	</form:form>
	</div>
	
	
</div>
</body>


</html>