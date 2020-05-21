package com.ldonline.yousinghd.gcpupdateserver;

import com.ldonline.spring.rythm.SimpleRythmViewResolver;
import com.ldonline.yousinghd.gcpupdateserver.interceptor.UserActiveSecurityApiInterceptor;
import org.eclipse.jetty.util.log.Log;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.sql.*;

@Configuration
@SpringBootApplication
public class GcpUpdateServerApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		ConfigurableApplicationContext run = SpringApplication.run(GcpUpdateServerApplication.class, args);

//		Connection connection = getJDBCConnection();
//		if(connection != null){
//			System.out.println("Connect Success");
//		} else{
//			System.out.println("Connect Error");
//		}
	}

//	public static Connection  getJDBCConnection(){
//
//		String url = "jdbc:mysql://localhost:3306/mydb";
//		String user = "root";
//		String password = "123123";
//		try {
//			Class.forName("com.mysql.jdbc.Driver");
//			return DriverManager.getConnection(url,user,password);
////			Statement myStmt = myConn.createStatement();
////			String sql = "select * from contacts";
////			ResultSet rs = myStmt.executeQuery(sql);
////
////			while(rs.next()){
////				System.out.println(rs.getString("name"));
////			}
//
//		} catch (SQLException e) {
//			e.printStackTrace();
//		} catch (ClassNotFoundException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}

	@Bean
	public ViewResolver getViewResolver() {
		SimpleRythmViewResolver resolver = new SimpleRythmViewResolver();
			resolver.setRootDirectory("rythm/views/");
			resolver.setSuffix(".html");
			return resolver;
		}

		@Override
		public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(userActiveApiSecurityInterceptor())//
				.addPathPatterns("/3.0/auth/dl/**");
	}

	@Bean
	public UserActiveSecurityApiInterceptor userActiveApiSecurityInterceptor() {
		return new UserActiveSecurityApiInterceptor();
	}
}
