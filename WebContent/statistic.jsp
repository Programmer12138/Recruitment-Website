<%@ page language="java" pageEncoding="utf-8" %>
<%@ page import="DBconn.*" %>
<%
   //Java代码
   System.out.println("成功启动统计报表jsp");
   String data=DBConn.get_statistic();
   System.out.println("申请jsp返回的消息是"+data);
   out.write(data);
%>