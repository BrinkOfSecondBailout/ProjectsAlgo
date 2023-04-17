<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page isErrorPage="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" type="text/css" href="/css/style.css">

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" 
integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
<title>Jiujitsu Tournaments Dashboard</title>
</head>
<body>
 <div class="container">
 <h1 class="display-1 text-end">Welcome, <a href="/users/${user.id}"><em>${user.name}!</em></a></h1>
 
 
 
 <div class="text-end">
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
 <div>
 <a href="/users/edit/${user.id}">edit profile</a>
 <a href="/logout">log out</a>
 </div>
 </div>
 
 <div>
 <img class="bg-pic-left" src="/img/flying-armbar.png" alt="jiujitsu-bg">
 </div>

 
 <div class="dashboard">
 <h1 class="display-5">All Tournaments</h1>
 <table class="table">
 	<thead>
 	<tr>
 		<th>Name</th>
 		<th>Location</th>
 		<th>Price</th>
 		<th>Date (Sorted)</th>
 		<th>Added By</th>
 		<th>Your Status</th>
 	</tr>
 	</thead>
 	<tbody>
 	<c:forEach var="comp" items="${comps}">
 	<tr>
 		<td data-label="Name"><a href="/comps/${comp.id}"><c:out value="${comp.name}"/></a></td>
 		<td data-label="Location"><c:out value="${comp.location}"/></td>
 		<td data-label="Price"><c:out value="$${comp.price}"/></td>
 		<td data-label="Date"><fmt:formatDate pattern="MMMM dd, yyyy" value="${comp.date}"/></td>
 		<td data-label="Added By"><a href="/users/${comp.creator.id}"><c:out value="${comp.creator.name}"/></a></td>
 		<c:forEach var="tourney" items="${user.comps}">
 			<c:if test = "${tourney.id == comp.id}">
 				<td data-label="Status">Registered</td>
 			</c:if>
 		</c:forEach>
 	</tr>
 	</c:forEach>
 	</tbody>
 </table>
 <a href="/comps/new"><button type="button" class="btn btn-outline-primary">Add a tournament</button></a>
 
 
  <h1 class="display-5">All Competitors</h1>
  <table class="table">
  	<thead>
  	<tr>
 		<th>Competitor Name</th>
 		<th>Belt Rank</th>
 		<th>Action</th>
 	</tr>
 	</thead>
 	<tbody>
 	<c:forEach var="user" items="${users}">
 	<tr>
 		<td data-label="Name"><a href="/users/${user.id}"><c:out value="${user.name}"/></a>
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
 	</tr>
 	</c:forEach>
 	</tbody>
 	</table>
 </div>
  
 </div>
</body>
</html>