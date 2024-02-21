package com.example.group4eaten;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
@ComponentScan(basePackages = "com.example.group4eaten")
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:80",
                        "http://localhost:3000",
                        "http://43.202.63.5",
                        "https://eaten-ecc.site",
                        "http://eaten-ecc.site",
                        "https://eaten-five.vercel.app"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true)
                .maxAge(3600);
        // .allowedHeaders("header1", "header2") // 필요한 경우, 추가적인 허용 헤더
        // .exposedHeaders("header1", "header2") // 필요한 경우, 노출할 헤더
    }
}
