package com.example.group4eaten;

import org.springframework.web.filter.CorsFilter; // 이 부분을 추가
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
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

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:80");
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOrigin("http://43.202.63.5");
        config.addAllowedOrigin("https://eaten-ecc.site");
        config.addAllowedOrigin("http://eaten-ecc.site");
        config.addAllowedOrigin("https://eaten-five.vercel.app");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setMaxAge(6000L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(new CorsFilter(source));
        filterBean.setOrder(0);

        return filterBean;
    }

}
