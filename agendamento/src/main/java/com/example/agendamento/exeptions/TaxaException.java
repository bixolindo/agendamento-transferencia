package com.example.agendamento.exeptions;

public class TaxaException extends Exception{
	
    private static final long serialVersionUID = 1149241039409861914L;

	
    public TaxaException(String msg){
        super(msg);
    }

}
