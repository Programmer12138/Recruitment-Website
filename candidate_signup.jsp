<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="DBconn.*" %>
<%
   //Java代码
   System.out.println("成功求职者注册登录jsp");
   String email = request.getParameter("email");
   String pwd = request.getParameter("pwd");
   String name = request.getParameter("name");
   String degree = request.getParameter("degree");
   String major = request.getParameter("major");
   String school = request.getParameter("school");
   String skill_certificate = request.getParameter("skill_certificate");
   String skills = request.getParameter("skills");
   String awards = request.getParameter("awards");
   String project_experience = request.getParameter("project_experience");
   String self_evaluation = request.getParameter("self_evaluation");
   String msg=DBConn.candidate_signup(name, email, pwd, degree, major, school, skill_certificate, skills, awards, project_experience, self_evaluation);
   System.out.println("注册jsp返回的消息是"+msg);
   out.write(msg);
%>