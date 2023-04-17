<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">

<link rel="stylesheet" type="text/css" href="/css/style.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" 
integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
<title>Tournament Details</title>
</head>
<body>
<div class="container">
	<h1 class="display-1 text-center">${comp.name}</h1>
	<p class="display-6 text-center">Added by: ${comp.creator.name}</p>
	<p class="display-7 text-center">${comp.details}</p>
	<p class="display-7 text-center">Located in ${comp.location}</p>
	<p class="display-7 text-center">Cost per entry: $${comp.price}</p>
	<p class="display-7 text-center">Event will take place on <fmt:formatDate pattern="MMMM dd, yyyy" value="${comp.date}"/></p>
	
	<div class="bottom-buttons">
	
	
	<c:if test="${isParticipating == 'false'}">
		<a href="/comps/signup/${comp.id}"><button type="button" class="btn btn-outline-primary">Sign me up!</button></a>
	</c:if>
	
	
	</div>
	
	<img class="bg-pic-left" src="/img/bjj2.png" alt="jiujitsu-bg">
	
	
	<div class="bottom-buttons">
	<c:if test= "${comp.creator.id == userId}">
 			<td><a href="/comps/delete/${comp.id}"><button type="button" class="btn btn-outline-danger">Delete Tournament</button></a></td>
 	</c:if>
 	<c:if test= "${comp.creator.id == userId}">
 			<td><a href="/comps/edit/${comp.id}"><button type="button" class="btn btn-outline-primary">Edit Tournament</button></a></td>
 	</c:if>
 	</div>
 	<div class="dashboard">
	<h1 class="display-5 text-center">All Competitors Attending:</h1>
	<table class="table">
		<thead>
		<tr>
			<th>Name</th>
			<th>Belt Rank</th>
			<th>Action</th>
		</tr>
		</thead>
		<tbody>
		<c:forEach var="user" items="${comp.users}">
			<tr>
				<td data-label="Name"><c:out value="${user.name}"/></td>
				
				<c:if test = "${user.belt == 'White'}">
         			<td data-label="Belt"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/BJJ_White_Belt.svg"  width="70" height="30" alt="white-belt"></td>
 				</c:if>
 				<c:if test = "${user.belt == 'Blue'}">
         			<td data-label="Belt"><img src="https://upload.wikimedia.org/wikipedia/commons/7/72/BJJ_Blue_Belt.svg" width="70" height="30" alt="blue-belt"></td>
 				</c:if>
 				<c:if test = "${user.belt == 'Purple'}">
         			<td data-label="Belt"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/BJJ_Purple_Belt.svg" width="70" height="30" alt="purple-belt"></td>
 				</c:if>
 				<c:if test = "${user.belt == 'Brown'}">
         			<td data-label="Belt"><img src="https://upload.wikimedia.org/wikipedia/commons/2/23/BJJ_Brown_Belt.svg" width="70" height="30" alt="brown-belt"></td>
 				</c:if>
  				<c:if test = "${user.belt == 'Black'}">
         			<td data-label="Belt"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/BJJ_BlackBelt.svg" width="70" height="30" alt="black-belt"></td>
 				</c:if>
 		
 				<c:if test = "${user.id != userId}">
 					<td data-label="Action"><a href="/messages/new/${user.id}">Message</a></td>
 				</c:if>
				
				
				<c:if test = "${user.id == userId}">
					<td data-label="Action"><a href="/comps/remove/${comp.id}"><button type="button" class="btn btn-outline-warning">Remove me</button></a></td>
				</c:if>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<a href="/dashboard">back to dashboard</a>
	</div>
	
</div>
</body>
</html>