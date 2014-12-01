// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.domain;

import com.ssigdl.sirc.domain.SsiDireccionEmpresaDataOnDemand;
import com.ssigdl.sirc.domain.SsiDireccionEmpresaIntegrationTest;
import com.ssigdl.sirc.entity.SsiDireccionEmpresa;

import java.util.Iterator;
import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

privileged aspect SsiDireccionEmpresaIntegrationTest_Roo_IntegrationTest {
    
    declare @type: SsiDireccionEmpresaIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: SsiDireccionEmpresaIntegrationTest: @ContextConfiguration(locations = "classpath*:/META-INF/spring/applicationContext*.xml");
    
    declare @type: SsiDireccionEmpresaIntegrationTest: @Transactional;
    
    @Autowired
    SsiDireccionEmpresaDataOnDemand SsiDireccionEmpresaIntegrationTest.dod;
    
    @Test
    public void SsiDireccionEmpresaIntegrationTest.testCountSsiDireccionEmpresas() {
        Assert.assertNotNull("Data on demand for 'SsiDireccionEmpresa' failed to initialize correctly", dod.getRandomSsiDireccionEmpresa());
        long count = SsiDireccionEmpresa.countSsiDireccionEmpresas();
        Assert.assertTrue("Counter for 'SsiDireccionEmpresa' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void SsiDireccionEmpresaIntegrationTest.testFindSsiDireccionEmpresa() {
        SsiDireccionEmpresa obj = dod.getRandomSsiDireccionEmpresa();
        Assert.assertNotNull("Data on demand for 'SsiDireccionEmpresa' failed to initialize correctly", obj);
        Integer id = obj.getDireId();
        Assert.assertNotNull("Data on demand for 'SsiDireccionEmpresa' failed to provide an identifier", id);
        obj = SsiDireccionEmpresa.findSsiDireccionEmpresa(id);
        Assert.assertNotNull("Find method for 'SsiDireccionEmpresa' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'SsiDireccionEmpresa' returned the incorrect identifier", id, obj.getDireId());
    }
    
    @Test
    public void SsiDireccionEmpresaIntegrationTest.testFindAllSsiDireccionEmpresas() {
        Assert.assertNotNull("Data on demand for 'SsiDireccionEmpresa' failed to initialize correctly", dod.getRandomSsiDireccionEmpresa());
        long count = SsiDireccionEmpresa.countSsiDireccionEmpresas();
        Assert.assertTrue("Too expensive to perform a find all test for 'SsiDireccionEmpresa', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<SsiDireccionEmpresa> result = SsiDireccionEmpresa.findAllSsiDireccionEmpresas();
        Assert.assertNotNull("Find all method for 'SsiDireccionEmpresa' illegally returned null", result);
        Assert.assertTrue("Find all method for 'SsiDireccionEmpresa' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void SsiDireccionEmpresaIntegrationTest.testFindSsiDireccionEmpresaEntries() {
        Assert.assertNotNull("Data on demand for 'SsiDireccionEmpresa' failed to initialize correctly", dod.getRandomSsiDireccionEmpresa());
        long count = SsiDireccionEmpresa.countSsiDireccionEmpresas();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<SsiDireccionEmpresa> result = SsiDireccionEmpresa.findSsiDireccionEmpresaEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'SsiDireccionEmpresa' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'SsiDireccionEmpresa' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void SsiDireccionEmpresaIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'SsiDireccionEmpresa' failed to initialize correctly", dod.getRandomSsiDireccionEmpresa());
        SsiDireccionEmpresa obj = dod.getNewTransientSsiDireccionEmpresa(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'SsiDireccionEmpresa' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'SsiDireccionEmpresa' identifier to be null", obj.getDireId());
        try {
            obj.persist();
        } catch (final ConstraintViolationException e) {
            final StringBuilder msg = new StringBuilder();
            for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                final ConstraintViolation<?> cv = iter.next();
                msg.append("[").append(cv.getRootBean().getClass().getName()).append(".").append(cv.getPropertyPath()).append(": ").append(cv.getMessage()).append(" (invalid value = ").append(cv.getInvalidValue()).append(")").append("]");
            }
            throw new IllegalStateException(msg.toString(), e);
        }
        obj.flush();
        Assert.assertNotNull("Expected 'SsiDireccionEmpresa' identifier to no longer be null", obj.getDireId());
    }
    
    @Test
    public void SsiDireccionEmpresaIntegrationTest.testRemove() {
        SsiDireccionEmpresa obj = dod.getRandomSsiDireccionEmpresa();
        Assert.assertNotNull("Data on demand for 'SsiDireccionEmpresa' failed to initialize correctly", obj);
        Integer id = obj.getDireId();
        Assert.assertNotNull("Data on demand for 'SsiDireccionEmpresa' failed to provide an identifier", id);
        obj = SsiDireccionEmpresa.findSsiDireccionEmpresa(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'SsiDireccionEmpresa' with identifier '" + id + "'", SsiDireccionEmpresa.findSsiDireccionEmpresa(id));
    }
    
}
