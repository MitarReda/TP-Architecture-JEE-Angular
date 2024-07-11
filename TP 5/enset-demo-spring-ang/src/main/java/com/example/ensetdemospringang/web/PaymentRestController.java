package com.example.ensetdemospringang.web;

import com.example.ensetdemospringang.dtos.NewPaymentDTO;
import com.example.ensetdemospringang.entity.Payment;
import com.example.ensetdemospringang.entity.PaymentStatus;
import com.example.ensetdemospringang.entity.PaymentType;
import com.example.ensetdemospringang.entity.Student;
import com.example.ensetdemospringang.repository.PaymentRepository;
import com.example.ensetdemospringang.repository.StudentRepository;
import com.example.ensetdemospringang.services.PaymentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("*")
public class PaymentRestController {
    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;
    private PaymentService paymentService;

    public PaymentRestController(StudentRepository studentRepository,PaymentRepository paymentRepository,PaymentService paymentService){
        this.studentRepository=studentRepository;
        this.paymentRepository=paymentRepository;
        this.paymentService=paymentService;
    }
    @GetMapping(path="/payments")
    public List<Payment> allPayment(){
        return paymentRepository.findAll();
    }
    @GetMapping(path="/students/{code}/payments")
    public List<Payment> paymentsByStudent(@PathVariable String code){
        return paymentRepository.findByStudentCode(code);
    }
    @GetMapping(path="/payments/byStatus")
    public List<Payment> paymentsByStatus(@RequestParam PaymentStatus status){
        return paymentRepository.findByStatus(status);
    }
    @GetMapping(path="/payments/byType")
    public List<Payment> paymentsByType(@RequestParam PaymentType type){
        return paymentRepository.findByType(type);
    }
    @GetMapping(path="/payments/{id}")
    public Payment getPaymentById(@PathVariable long id){
        return paymentRepository.findById(id).get();
    }
    @GetMapping(path="/students")
    public  List<Student> allStudents(){
        return studentRepository.findAll();
    }
    @GetMapping(path="/students/{code}")
    public Student getStudentByCode(@PathVariable String code){
        return studentRepository.findByCode(code);
    }
    @GetMapping(path="/studentsByProgramId")
    public List<Student> getStudentsByProgramId(@RequestParam String programId){
        return studentRepository.findByProgramId(programId);
    }
    @PutMapping("/payments/{id}")
    public Payment updatePaymentStatus(@RequestParam PaymentStatus status,@PathVariable Long id){
        return paymentService.updatePaymentStatus(status,id);
    }
    @PostMapping(path="payments",consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment savePayment(@RequestParam("file") MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {
       return this.paymentService.savePayment(file,newPaymentDTO);
    }
    @GetMapping(path="/paymentFile/{paymentId}",produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws IOException {
        return paymentService.getPaymentFile(paymentId);
    }
}
