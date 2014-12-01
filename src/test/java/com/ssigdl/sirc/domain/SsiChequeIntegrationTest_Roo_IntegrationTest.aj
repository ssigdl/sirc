// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.domain;

import com.ssigdl.sirc.domain.SsiChequeDataOnDemand;
import com.ssigdl.sirc.domain.SsiChequeIntegrationTest;
import com.ssigdl.sirc.entity.SsiCheque;

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

privileged aspect SsiChequeIntegrationTest_Roo_IntegrationTest {
    
    declare @type: SsiChequeIntegrationTest: @RunWith(SpringJUnit4ClassRunner.class);
    
    declare @type: SsiChequeIntegrationTest: @ContextConfiguration(locations = "classpath*:/META-INF/spring/applicationContext*.xml");
    
    declare @type: SsiChequeIntegrationTest: @Transactional;
    
    @Autowired
    SsiChequeDataOnDemand SsiChequeIntegrationTest.dod;
    
    @Test
    public void SsiChequeIntegrationTest.testCountSsiCheques() {
        Assert.assertNotNull("Data on demand for 'SsiCheque' failed to initialize correctly", dod.getRandomSsiCheque());
        long count = SsiCheque.countSsiCheques();
        Assert.assertTrue("Counter for 'SsiCheque' incorrectly reported there were no entries", count > 0);
    }
    
    @Test
    public void SsiChequeIntegrationTest.testFindSsiCheque() {
        SsiCheque obj = dod.getRandomSsiCheque();
        Assert.assertNotNull("Data on demand for 'SsiCheque' failed to initialize correctly", obj);
        Integer id = obj.getCheId();
        Assert.assertNotNull("Data on demand for 'SsiCheque' failed to provide an identifier", id);
        obj = SsiCheque.findSsiCheque(id);
        Assert.assertNotNull("Find method for 'SsiCheque' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'SsiCheque' returned the incorrect identifier", id, obj.getCheId());
    }
    
    @Test
    public void SsiChequeIntegrationTest.testFindAllSsiCheques() {
        Assert.assertNotNull("Data on demand for 'SsiCheque' failed to initialize correctly", dod.getRandomSsiCheque());
        long count = SsiCheque.countSsiCheques();
        Assert.assertTrue("Too expensive to perform a find all test for 'SsiCheque', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<SsiCheque> result = SsiCheque.findAllSsiCheques();
        Assert.assertNotNull("Find all method for 'SsiCheque' illegally returned null", result);
        Assert.assertTrue("Find all method for 'SsiCheque' failed to return any data", result.size() > 0);
    }
    
    @Test
    public void SsiChequeIntegrationTest.testFindSsiChequeEntries() {
        Assert.assertNotNull("Data on demand for 'SsiCheque' failed to initialize correctly", dod.getRandomSsiCheque());
        long count = SsiCheque.countSsiCheques();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<SsiCheque> result = SsiCheque.findSsiChequeEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'SsiCheque' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'SsiCheque' returned an incorrect number of entries", count, result.size());
    }
    
    @Test
    public void SsiChequeIntegrationTest.testPersist() {
        Assert.assertNotNull("Data on demand for 'SsiCheque' failed to initialize correctly", dod.getRandomSsiCheque());
        SsiCheque obj = dod.getNewTransientSsiCheque(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'SsiCheque' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'SsiCheque' identifier to be null", obj.getCheId());
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
        Assert.assertNotNull("Expected 'SsiCheque' identifier to no longer be null", obj.getCheId());
    }
    
    @Test
    public void SsiChequeIntegrationTest.testRemove() {
        SsiCheque obj = dod.getRandomSsiCheque();
        Assert.assertNotNull("Data on demand for 'SsiCheque' failed to initialize correctly", obj);
        Integer id = obj.getCheId();
        Assert.assertNotNull("Data on demand for 'SsiCheque' failed to provide an identifier", id);
        obj = SsiCheque.findSsiCheque(id);
        obj.remove();
        obj.flush();
        Assert.assertNull("Failed to remove 'SsiCheque' with identifier '" + id + "'", SsiCheque.findSsiCheque(id));
    }
    
}
