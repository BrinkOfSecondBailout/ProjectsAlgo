<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" type="text/css" href="/css/style.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" 
integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
<title>User Profile</title>
</head>
<body>
	<div class="container">
	<h1 class="center-text display-1">${user.name}</h1>
	<div class="center-text">
		<a href="/dashboard">return to dashboard</a>
	</div>
	
	<div class="belt-display">
	<c:if test = "${user.belt == 'White'}">
         <img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/BJJ_White_Belt.svg"  width="170" height="70" alt="white-belt">
 	</c:if>
 	<c:if test = "${user.belt == 'Blue'}">
         <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/BJJ_Blue_Belt.svg" width="170" height="70" alt="blue-belt">
 	</c:if>
 	<c:if test = "${user.belt == 'Purple'}">
         <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/BJJ_Purple_Belt.svg" width="170" height="70" alt="purple-belt">
 	</c:if>
 	<c:if test = "${user.belt == 'Brown'}">
         <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/BJJ_Brown_Belt.svg" width="170" height="70" alt="brown-belt">
 	</c:if>
  	<c:if test = "${user.belt == 'Black'}">
         <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/BJJ_BlackBelt.svg" width="170" height="70" alt="black-belt">
 	</c:if>
 	</div>
 	
 	<div class="message-button">
 		<c:if test = "${user.id != userId}">
 			<a href="/messages/new/${user.id}"><button class="btn btn-outline-primary">Message ${user.name}</button></a>
 		</c:if>
 	</div>
 	
 	<img class="bg-pic-middle" src="/img/bjj.png" alt="jiujitsu-bg">
 	
 	 <div class="dashboard">
 		<h1 class="display-6 text-center">All Registered Tournaments</h1>
 		<table class="table">
 			<thead>
 			<tr>
 				<th>Tournament Name</th>
 				<th>Location</th>
 				<th>Price</th>
	 			<th>Date</th>
	 			<th>Action</th>
 			</tr>
 			</thead>
 			<tbody>
 			<c:forEach var="comp" items="${user.comps}">
 				<tr>
 					<td data-label="Name"><a href="/comps/${comp.id}"><c:out value="${comp.name}"/></a></td>
 					<td data-label="Location"><c:out value="${comp.location}"/></td>
 					<td data-label="Price"><c:out value="$${comp.price}"/></td>
 					<td data-label="Date"><fmt:formatDate pattern="MMMM dd, yyyy" value="${comp.date}"/></td>
 					
 					<c:if test = "${user.id == userId}">
 						<td data-label="Action"><a href="/users/comps/remove/${comp.id}"><button type="button" class="btn btn-outline-warning">Remove me</button></a></td>
 					</c:if>
 					<c:if test = "${user.id != userId}">
 						<td></td>
 					</c:if>
 				</tr>
 			</c:forEach>
 			</tbody>
 			
 		</table>
 		
 		<div>
 			<c:if test = "${user.id == userId}">
 			<h1 class="display-6 text-center">Inbox</h1>
 			<h5>(Sorted By Most Recent)</h5>
 				<c:forEach var="message" items="${user.messages}">
 					<div class="message-square">
 					<div>
 					<p>From: <a href="/users/${message.creator.id}"><c:out value="${message.creator.name}"/></a>
 					<fmt:formatDate pattern="MMMM dd, hh:mm a" value="${message.createdAt}"/></p>
 					</div>
 					<div>
 					<i><c:out value="${message.text}"/></i>
 					</div>
 					<div>
 					<a href="/messages/new/${message.creator.id}"><button class="btn btn-outline-info btn-sm" >Reply</button></a>
 					<a href="/messages/delete/${message.id}"><button class="btn btn-outline-danger btn-sm" >Delete</button></a>
 					</div>
 					</div>
 					<br>
 				</c:forEach>
 			</c:if>
 		</div>
 	
 	</div>
</body>
</html>