// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiFacturaArticuloRel;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

privileged aspect SsiFacturaArticuloRel_Roo_ToString {
    
    public String SsiFacturaArticuloRel.toString() {
        return new ReflectionToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE).setExcludeFieldNames("fartArtIdFk", "fartFactIdFk").toString();
    }
    
}
