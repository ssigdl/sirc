package com.ssigdl.sirc.serializer;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class CustomDateDeserializer extends JsonDeserializer<Date> {
	@Override
    public Date deserialize(JsonParser jsonparser,
            DeserializationContext deserializationcontext) throws IOException, JsonProcessingException {

		DateFormat sourceFormat = new SimpleDateFormat("yyyy-MM-dd");
        String date = jsonparser.getText();
        Date parsedDate = null;
        
        if("".equals(date) == false){
	        try {
	        	parsedDate = sourceFormat.parse(date);
	        } catch (ParseException e) {
	            e.printStackTrace();
	        }
        }
        return parsedDate;
    }
}
