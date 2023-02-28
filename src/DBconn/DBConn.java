package DBconn;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DBConn {
	static Connection conn=null;
	static{
		try {
			Class.forName("net.sourceforge.jtds.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String url = "jdbc:mysql://localhost:3306/rczp?serverTimezone=GMT";
		
		try {
			conn =DriverManager.getConnection(url, "root", "1234");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("successfully connect to db");
	}
	static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	public static User signin(String email,String pwd) throws SQLException {
		//首先查找是不是求职者		
		String sql="select * from candidate where `email`=\'"+email+"\'";
		System.out.println("有待执行的语句是"+sql);
		PreparedStatement ps = conn.prepareStatement(sql);
		//ps.setString(1, email);
		ResultSet rs = ps.executeQuery(sql);
		//如果说查找到了
		if (rs.next() == true) {
            //对比密码是否一样
            String pwd_fromDB=rs.getString("pwd");
            String name=rs.getString("name");
            System.out.println("查询到的密码是"+pwd);
            //对比两个密码是否一样
            if(pwd_fromDB.equals(pwd)) {
            	System.out.println("在求职者的表里查到的，sign函数成功返回"+name);
            	return new User(name,"candidate");
            }
        }
		//如果没有找到，有可能是公司，也有可能什么也不是，根本没有这个邮箱
		else {
			//然后查找是不是公司
			sql="select * from company where `email`=\'"+email+"\'";
			System.out.println("有待执行的语句是"+sql);
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery(sql);
			//如果说查找到了
			if (rs.next() == true) {
				//对比密码是否一样
	            String pwd_fromDB=rs.getString("pwd");
	            String name=rs.getString("name");
	            System.out.println("查询到的密码是"+pwd);
	            //对比两个密码是否一样
	            if(pwd_fromDB.equals(pwd)) {
	            	System.out.println("在员工的表里查到的，sign函数成功返回"+name);
	            	return new User(name,"company");
	            }
			}
			}
		//然后查找是不是公司
		System.out.println("两张表都没查到");
		return null;
	}
	public static String company_signup(String name,String email, String pwd, String description) throws SQLException {
		String sql="insert into company values(?,?,?,?)";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, name);
		ps.setString(2, email);
		ps.setString(3, pwd);
		ps.setString(4, description);
		int ret = ps.executeUpdate();
		if (ret > 0)return "注册成功";
		else return "注册失败";
	}
	public static String candidate_signup(String name,String email, String pwd, String degree,String major,String school,String skill_certificate,String skills,String awards,String project_experience, String self_evaluation) throws SQLException {
		String sql="insert into candidate values(?,?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, email);
		ps.setString(2, name);
		ps.setString(3, pwd);
		ps.setString(4, degree);
		ps.setString(5, major);
		ps.setString(6, school);
		ps.setString(7, skill_certificate);
		ps.setString(8, skills);
		ps.setString(9, awards);
		ps.setString(10, project_experience);
		ps.setString(11, self_evaluation);
		int ret = ps.executeUpdate();
		if (ret > 0)return "注册成功";
		else return "注册失败";
	}
	public static String post_job(String name,String type,String dept_name,String degree,String salary,String experience_requirement,String skill_requirement,String description) throws SQLException {
		String sql="insert into job values(?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, name);
		ps.setString(2, type);
		ps.setString(3, degree);
		ps.setString(4, salary);
		ps.setString(5, experience_requirement);
		ps.setString(6, skill_requirement);
		ps.setString(7, description);
		ps.setString(8, "4321@recruit.com");
		Date date = new Date();
		ps.setString(9,formatter.format(date));
		ps.setString(10,dept_name);
		int ret = ps.executeUpdate();
		if (ret > 0)return "post successfully";
		else return "fail to post";
	}
	public static String get_job_detail(String company_email,String name) throws SQLException {
		String type="";
		String location="";
		String degree="";
		String salary="";
		String experience_requirement="";
		String skill_requirement="";
		String job_description="";
		String company_description="";
		String dept_name="";
		//先从job这张表里读取信息
		String sql="select type,location,degree,salary,experience_requirement,skill_requirement,job.description,job.dept_name from job,dept where job.dept_name=dept.dept_name and job.company_email=dept.company_email and job.`company_email`=\'"+company_email+"\'and `name`=\'"+name+"\'";
		System.out.println("有待执行的语句是"+sql);
		PreparedStatement ps = conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		if (rs.next() == true) {
			type=rs.getString("type");
			location=rs.getString("location");
			degree=rs.getString("degree");
			salary=rs.getString("salary");
			experience_requirement=rs.getString("experience_requirement");
			skill_requirement=rs.getString("skill_requirement");
			job_description=rs.getString("description");
			dept_name=rs.getString("dept_name");
		}
		//然后从company这张表里读取信息
		sql="select description from company where `email`=\'"+company_email+"\'";
		System.out.println("有待执行的语句是"+sql);
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery(sql);
		if (rs.next() == true) {
			company_description=rs.getString("description");
		}
		return name+"\n"+type+"\n"+location+"\n"+degree+"\n"+salary+"\n"+experience_requirement+"\n"+skill_requirement+"\n"+job_description+"\n"+company_description+"\n"+dept_name+"\n"+company_email;
	}
	
	public static String search_job(String name,String location,String type) throws SQLException {
		String sql="select company.`name` AS company_name ,job.`name` as job_name, type,location,salary,job.company_email from company,job,dept where job.company_email=company.email and job.dept_name=dept.dept_name and dept.company_email=company.email and job.`name`=\'"+name+"\' and dept.location=\'"+location+"\' and type=\'"+type+"\'";
		System.out.println("有待执行的SQL语句是"+sql);
		PreparedStatement ps = conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		String search_result="";
		while (rs.next() == true) {
			search_result=search_result+rs.getString("company_name")+"\n"+rs.getString("job_name")+"\n"+rs.getString("type")+"\n"+rs.getString("location")+"\n"+rs.getString("salary")+"\n"+rs.getString("company_email")+"\n";
		}
		return search_result;
	}
	
	public static String application(String job_name,String company_email,String interview_time,String interview_platform) throws SQLException {
		Date date = new Date();
		String sql="insert into application values (?,?,?,?,?,?)";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1,formatter.format(date));
		ps.setString(2,"456@qq.com");
		ps.setString(3,job_name);
		ps.setString(4,company_email);
		ps.setString(5,interview_time);
		ps.setString(6,interview_platform);
		int ret = ps.executeUpdate();
		if (ret > 0)return "申请成功";
		else return "申请失败";
	}
	public static String get_statistic() throws SQLException {
		String job_count="0";
		String candidate_count="0";
		String company_count="0";
		String new_job_count="0";
		String new_application_count="0";
		String today_interview_count="0";
		//统计一共有多少个职位
		String sql="select count(*) as job_count from job";
		PreparedStatement ps = conn.prepareStatement(sql);
		ResultSet rs = ps.executeQuery(sql);
		if (rs.next() == true) {
			job_count=rs.getString("job_count");
		}
		//统计一共有多少个申请人
		sql="select count(*) as candidate_count from candidate";
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery(sql);
		if (rs.next() == true) {
			candidate_count=rs.getString("candidate_count");
		}
		//统计一共有多少个公司
		sql="select count(*) as company_count from company";
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery(sql);
		if (rs.next() == true) {
			company_count=rs.getString("company_count");
		}
		Date date = new Date();
		//统计今天发布了多少个职位
		sql="select count(*) as new_job_count from job where post_time=\'"+formatter.format(date)+"\'";
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery(sql);
		if (rs.next() == true) {
			new_job_count=rs.getString("new_job_count");
		}
		//统计今天新增了多少份申请
		sql="select count(*) as new_application_count from application where application_time=\'"+formatter.format(date)+"\'";
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery(sql);
		if (rs.next() == true) {
			new_application_count=rs.getString("new_application_count");
		}
		//统计今天又多少场面试
		sql="select count(*) as today_interview_count from application where interview_time=\'"+formatter.format(date)+"\'";
		ps = conn.prepareStatement(sql);
		rs = ps.executeQuery(sql);
		if (rs.next() == true) {
			today_interview_count=rs.getString("today_interview_count");
		}
		return job_count+"\n"+candidate_count+"\n"+company_count+"\n"+new_job_count+"\n"+new_application_count+"\n"+today_interview_count;
	}
}