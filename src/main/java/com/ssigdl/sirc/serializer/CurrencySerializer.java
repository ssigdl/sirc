package com.ssigdl.sirc.serializer;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.DecimalFormat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class CurrencySerializer extends JsonSerializer<BigDecimal>  {
    

    @Override
    public void serialize(BigDecimal value, JsonGenerator gen, SerializerProvider provider) throws IOException, JsonProcessingException {
        DecimalFormat formatter = new DecimalFormat("#,###,###,###,###,###.00");
        
        gen.writeString(formatter.format(value));
    }

}
