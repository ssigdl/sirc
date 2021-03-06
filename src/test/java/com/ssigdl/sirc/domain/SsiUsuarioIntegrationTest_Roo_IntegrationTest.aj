// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.domain;

import com.ssigdl.sirc.domain.SsiUsuarioDataOnDemand;
import com.ssigdl.sirc.domain.SsiUsuarioIntegrationTest;
import com.ssigdl.sirc.entity.SsiUsuario;

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

privileged aspect SsiUsuarioIntegrationTest_Roo_IntegrationTest {
    
    declare @type: SsiUsuarioIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: SsiUsuarioIntegrationTest: @ContextConfiguration(locations = "classpath*:/META-INF/spring/applicationContext*.xml");
    
    declare @type: SsiUsuarioIntegrationTest: @Transactional;
    
    @Autowired
    SsiUsuarioDataOnDemand SsiUsuarioIntegrationTest.dod;
    
    @Test
    public void SsiUsuarioIntegrationTest.testCountSsiUsuarios() {
        Assert.assertNotNull("Data on demand for 'SsiUsuario' failed to initialize correctly", dod.getRandomSsiUsuario());
        long count = SsiUsuario.countSsiUsuarios();
        Assert.assertTrue("Counter for 'SsiUsuario' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void SsiUsuarioIntegrationTest.testFindSsiUsuario() {
        SsiUsuario obj = dod.getRandomSsiUsuario();
        Assert.assertNotNull("Data on demand for 'SsiUsuario' failed to initialize correctly", obj);
        Integer id = obj.getUsuId();
        Assert.assertNotNull("Data on demand for 'SsiUsuario' failed to provide an identifier", id);
        obj = SsiUsuario.findSsiUsuario(id);
        Assert.assertNotNull("Find method for 'SsiUsuario' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'SsiUsuario' returned the incorrect identifier", id, obj.getUsuId());
    }
    
    @Test
    public void SsiUsuarioIntegrationTest.testFindAllSsiUsuarios() {
        Assert.assertNotNull("Data on demand for 'SsiUsuario' failed to initialize correctly", dod.getRandomSsiUsuario());
        long count = SsiUsuario.countSsiUsuarios();
        Assert.assertTrue("Too expensive to perform a find all test for 'SsiUsuario', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<SsiUsuario> result = SsiUsuario.findAllSsiUsuarios();
        Assert.assertNotNull("Find all method for 'SsiUsuario' illegally returned null", result);
        Assert.assertTrue("Find all method for 'SsiUsuario' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void SsiUsuarioIntegrationTest.testFindSsiUsuarioEntries() {
        Assert.assertNotNull("Data on demand for 'SsiUsuario' failed to initialize correctly", dod.getRandomSsiUsuario());
        long count = SsiUsuario.countSsiUsuarios();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<SsiUsuario> result = SsiUsuario.findSsiUsuarioEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'SsiUsuario' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'SsiUsuario' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void SsiUsuarioIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'SsiUsuario' failed to initialize correctly", dod.getRandomSsiUsuario());
        SsiUsuario obj = dod.getNewTransientSsiUsuario(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'SsiUsuario' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'SsiUsuario' identifier to be null", obj.getUsuId());
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
        Assert.assertNotNull("Expected 'SsiUsuario' identifier to no longer be null", obj.getUsuId());
    }
    
    @Test
    public void SsiUsuarioIntegrationTest.testRemove() {
        SsiUsuario obj = dod.getRandomSsiUsuario();
        Assert.assertNotNull("Data on demand for 'SsiUsuario' failed to initialize correctly", obj);
        Integer id = obj.getUsuId();
        Assert.assertNotNull("Data on demand for 'SsiUsuario' failed to provide an identifier", id);
        obj = SsiUsuario.findSsiUsuario(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'SsiUsuario' with identifier '" + id + "'", SsiUsuario.findSsiUsuario(id));
    }
    
}
