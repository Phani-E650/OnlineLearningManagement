package com.application.demo.Dto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class AmazonS3Config {

  private String awsAccessKey;
  private String awsAccessSecretKey;
  private String awsRegion;

  public AmazonS3Config(@Value(value = "${aws.access-key}") String awsAccessKey,
      @Value(value = "${aws.access-secret-key}") String awsAccessSecretKey,
      @Value(value = "${aws.region}") String awsRegion) {
    this.awsAccessKey = awsAccessKey;
    this.awsAccessSecretKey = awsAccessSecretKey;
    this.awsRegion = awsRegion;
  }

  public AWSStaticCredentialsProvider getAwsCredentialsProvider() {
    BasicAWSCredentials awsCred =
        new BasicAWSCredentials(this.awsAccessKey, this.awsAccessSecretKey);
    return new AWSStaticCredentialsProvider(awsCred);
  }

  @Bean
  public AmazonS3 getAmazonS3Client() {
    return AmazonS3ClientBuilder.standard().withRegion(this.awsRegion)
        .withCredentials(getAwsCredentialsProvider()).build();
  }

}