package com.ssigdl.sirc.entity;
import org.springframework.roo.addon.dbre.RooDbManaged;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooJpaActiveRecord(versionField = "", table = "ssi_telefono_cat")
@RooDbManaged(automaticallyDelete = true)
@RooToString(excludeFields = { "ssiTelefonoes" })
public class SsiTelefonoCat {
}
