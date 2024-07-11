package com.example.ensetdemospringang.services;

import com.example.ensetdemospringang.dtos.NewPaymentDTO;
import com.example.ensetdemospringang.entity.Payment;
import com.example.ensetdemospringang.entity.PaymentStatus;
import com.example.ensetdemospringang.entity.PaymentType;
import com.example.ensetdemospringang.entity.Student;
import com.example.ensetdemospringang.repository.PaymentRepository;
import com.example.ensetdemospringang.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;

    public PaymentService(StudentRepository studentRepository,PaymentRepository paymentRepository){
        this.studentRepository=studentRepository;
        this.paymentRepository=paymentRepository;
    }

    public Payment savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {
        Path folderPath= Paths.get(System.getProperty("user.home"),"enset-data","payments");
        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        String fileName = UUID.randomUUID().toString();
        Path filePath=Paths.get(System.getProperty("user.home"),"enset-data","payments",fileName+".pdf");
        Files.copy(file.getInputStream(),filePath);
        Student student=studentRepository.findByCode(newPaymentDTO.getStudentCode());
        Payment payment=Payment.builder()
                .date(newPaymentDTO.getDate()).type(newPaymentDTO.getType()).student(student)
                .amount(newPaymentDTO.getAmount())
                .file(filePath.toUri().toString())
                .status(PaymentStatus.CREATED)
                .build();

        return paymentRepository.save(payment);
    }
    public Payment updatePaymentStatus(PaymentStatus status, Long id){
        Payment payment=paymentRepository.findById(id).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }
    public byte[] getPaymentFile(Long paymentId) throws IOException {
        Payment payment=paymentRepository.findById(paymentId).get();
        return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }
}
