<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="DBconn.*" %>
<%
   //获取
   System.out.println("成功启动发布职位jsp");
   String name = request.getParameter("name");
   String type = request.getParameter("type");
   String dept_name = request.getParameter("dept_name");
   String degree = request.getParameter("degree");
   String salary = request.getParameter("salary");
   String experience_requirement = request.getParameter("experience_requirement");
   String skill_requirement = request.getParameter("skill_requirement");
   String description = request.getParameter("description");
   String msg=DBConn.post_job(name,type,dept_name,degree,salary,experience_requirement,skill_requirement,description);
   System.out.println("发布职位jsp返回的消息是"+msg);
   out.write(msg);
%>